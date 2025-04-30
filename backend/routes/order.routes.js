
import express from "express";
import { createOrder,updateOrderStatus ,getOrderById} from "../controllers/order.controller.js";
 

const router = express.Router();

 
router.route("/create").post(createOrder);
 
router.route("/:orderId/status").patch(updateOrderStatus);

router.get('/order/:orderId', getOrderById);
export default router;
