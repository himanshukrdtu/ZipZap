import { Order } from '../models/order.model.js';
import fetch from 'node-fetch';

const getCoordinatesFromAddress = async (address) => {
  const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;  
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
  

  const response = await fetch(url);
  const data = await response.json();

  if (data.results.length > 0) {
    return {
      latitude: data.results[0].geometry.lat,
      longitude: data.results[0].geometry.lng,
    };
  }

  throw new Error("Failed to fetch coordinates.");
};

// Create a new Order
export const createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      totalPrice,
      user,  
    } = req.body;

    if (!shippingInfo || !orderItems || orderItems.length === 0 || !totalPrice || !user) {
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    
    const fullAddress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pincode}`;

    // Fetch lat/lng
    const { latitude, longitude } = await getCoordinatesFromAddress(fullAddress);

     
    shippingInfo.latitude = latitude;
    shippingInfo.longitude = longitude;

    // Create the order
    const order = await Order.create({
      shippingInfo,
      orderItems,
      totalPrice,
      user,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Failed to place order." });
  }
};

// Update Order Status (e.g., mark as Delivered)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;   
    const { status } = req.body;   

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required." });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    order.orderStatus = status;  
    await order.save();   

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}.`,
      order,
    });
  } catch (error) {
    console.error("Order status update error:", error.message);
    res.status(500).json({ success: false, message: "Failed to update order status." });
  }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required." });
    }

    const order = await Order.findById(orderId).populate('user', 'name email').populate('orderItems.product', 'name price');

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order by ID:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch order." });
  }
};
