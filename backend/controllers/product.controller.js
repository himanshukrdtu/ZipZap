

// Create a new product
import Product from '../models/product.model.js';
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      weight,
      price,
      discount,
      deliveryTime,
      category,
      stock,
    } = req.body;
 
    if (!name || !weight || price == null || !category) {
      return res.status(400).json({
        message: "Required fields (name, weight, price, category) are missing.",
        success: false
      });
    }

     
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        message: "Product image is required.",
        success: false
      });
    }
    const imageUrl = req.file.path;

    
    const newProduct = await Product.create({
      name,
      weight,
      price,
      discount,        
      deliveryTime,    
      imageUrl,
      category,
      stock            
    });

    return res.status(201).json({
      message: "Product created successfully.",
      success: true,
      product: newProduct
    });

  } catch (error) {
     
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};



// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Products fetched successfully.",
      success: true,
      products,
    });
  } catch (error) {
    console.error("getAllProducts error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Get a single product by ID
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully.",
      success: true,
      product,
    });
  } catch (error) {
    console.error("getSingleProduct error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
