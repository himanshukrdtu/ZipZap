 
import { Store } from '../models/store.model.js';
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";   

 

import fetch from 'node-fetch';  

const getCoordinatesFromAddress = async (address) => {
  const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;  
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
  

  const response = await fetch(url);
  const data = await response.json();

  if (data.results.length > 0) {
    return {
      lat: data.results[0].geometry.lat,
      lon: data.results[0].geometry.lng,
    };
  }

  throw new Error("Failed to fetch coordinates.");
};

export const createStore = async (req, res) => {
  try {
    const { store_id, address, operatorId } = req.body;

    if (!store_id || !address || !operatorId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    
    const operator = await User.findById(operatorId);
    if (!operator || operator.role !== 'store_operator') {
      return res.status(400).json({ message: "Invalid store operator." });
    }

     
    const { lat, lon } = await getCoordinatesFromAddress(address);

     
    const newStore = new Store({
      store_id,
      lat,
      lon,
      operator: operatorId,
      orders: []
    });

    await newStore.save();

    
    operator.store = newStore._id;
    await operator.save();

    return res.status(201).json({
      message: "Store created successfully",
      store: newStore
    });
  } catch (err) {
    console.error("Store creation error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

 

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find()
      .populate('orders')      
      .populate('operator');   

    res.status(200).json({
      message: 'All stores fetched successfully',
      stores,
    });
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 


 
 

export const addOrderToStore = async (req, res) => {
    try {
      const { store_id, orderId } = req.body;  
  
      // Find store using custom store_id (not MongoDB _id)
      const store = await Store.findOne({ store_id });
  
      if (!store) {
        return res.status(404).json({ message: "Store not found." });
      }
  
      
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      
      store.orders.push(orderId);
      await store.save();
  
      return res.status(200).json({
        message: "Order successfully added to the store.",
        store,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  
export const getOrdersByOperator = async (req, res) => {
  const { operatorId } = req.params;
  
  try {
    const store = await Store.findOne({ operator: operatorId }).populate({
      path: 'orders',
      populate: [
        { path: 'user', select: 'fullname email' },
        { path: 'orderItems.product', select: 'name price' }
      ]
    });

    if (!store) {
      return res.status(404).json({ message: 'Store not found for the given operator' });
    }

    res.status(200).json({
      success: true,
      orders: store.orders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
