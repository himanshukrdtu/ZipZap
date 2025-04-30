
import express from "express";
import { getAllStores, createStore ,addOrderToStore,getOrdersByOperator  } from "../controllers/store.controller.js";

const router = express.Router();
 

 
router.route("/create").post(createStore);
router.route('/add-order').post(addOrderToStore);
router.route('/get-allstores').get(getAllStores);
router.route('/operator/:operatorId/orders').get(getOrdersByOperator);


export default router;
