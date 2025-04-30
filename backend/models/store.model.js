 
import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
    store_id: { type: Number, required: true, unique: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    operator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  
});

export const Store= mongoose.model('Store', StoreSchema);
