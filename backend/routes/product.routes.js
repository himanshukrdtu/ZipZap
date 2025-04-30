import express from "express";
import upload from "../middleware/multer.js";
import { getAllProducts, getSingleProduct, createProduct } from "../controllers/product.controller.js";

const router = express.Router();

 
router.route("/getAllProducts").get(getAllProducts);
router.route("/:id").get(getSingleProduct);
router.post('/new', upload, createProduct);

export default router;
