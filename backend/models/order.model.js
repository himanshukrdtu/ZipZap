 
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
    latitude: { type: Number },   
    longitude: { type: Number },
  },

  orderItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  totalPrice: { type: Number, required: true, default: 0 },
  orderStatus: {
    type: String,
    required: true,
    default: 'Processing',
  },
});

export const Order = mongoose.model('Order', orderSchema);
