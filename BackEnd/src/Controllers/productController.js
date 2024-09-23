const Product = require("../models/productModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();
const fs = require("fs");
const path = require("path")

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    // console.log(req.body);

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ msg: "Name, price, and category are required" });
    }

    // Checking if a product with the same name exists in a different category
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res
        .status(401)
        .json({ msg: "Product with the same name already exists" });
    }

    if (existingProduct && existingProduct.category.toString() !== category) {
      return res
        .status(401)
        .json({ msg: "Same product cannot belong to multiple categories" });
    }

    let productData = {
      name,
      price,
      description,
      category,
      stock,
    };

    if (req.file) {
      // console.log(req.file)
      const imageUrl = `${process.env.DOMAIN}/uploads/products/${req.file.filename}`;
      productData.productImage = imageUrl;
    }

    const newProduct = new Product(productData);

    const response = await newProduct.save();
    return res
      .status(201)
      .json({ msg: "Product created successfully", newProduct: response });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ msg: "Server error" });
  }
};

//get the product by category

// const getProductByCategory = async (req, res) => {
//   try {
//     const categoryId = req.params.categoryId;

//     // Convert categoryId to ObjectId
//     if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//       return res.status(400).json({ msg: "Invalid category ID format" });
//     }

//     const products = await Product.find({ category: mongoose.Types.ObjectId(categoryId) });

//     if (products.length === 0) {
//       return res.status(404).json({ msg: "No products found for this category" });
//     }

//     res.status(200).json({ msg: "Products found successfully", products });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// };

// Search for products
// const searchProducts = async (req, res) => {
//     try {
//       const { q, category } = req.query;

//       // Create a search query
//       let searchCriteria = {
//         $or: [
//           { name: { $regex: q, $options: 'i' } },
//           { description: { $regex: q, $options: 'i' } },
//         ],
//       };

//       // If category is provided in the search query, add it to the criteria
//       if (category) {
//         searchCriteria.category = category;
//       }

//       // Find products based on search criteria
//       const products = await Product.find(searchCriteria).populate('category');

//       // Return the found products
//       if (products.length > 0) {
//         return res.status(200).json({ products });
//       } else {
//         return res.status(404).json({ msg: 'No products found matching the criteria' });
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ msg: 'Server error' });
//     }
//   };

//function to get all Product

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ msg: "No products found" });
    }
    return res
      .status(200)
      .json({ msg: "products retrived sucessful", products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

//function to get product by product id

const getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product found successfully", product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, price, description, category, stock } = req.body;

    // Find the product by ID
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Update the product fields with new data
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    // If a new image file is uploaded, update the product image
    
    if (req.file) {
      const productImageUrl = `${process.env.DOMAIN}/uploads/products/${req.file.filename}`;
      product.productImage = productImageUrl;
    }

    // Save the updated product
    const updatedProduct = await product.save();

     return res
      .status(200)
      .json({ msg: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error", error: err.message });
  }
};

// //update a product (admin only)
// const updateProduct = async(req,res)=>{
//   try{
//     const {name, price, description, category,stock} = req.body;

//   } catch(err){
//     console.log(err)
//      return res.status(500).json({msg:"server error",error : err.message})
//    }

// }
// Search and sort products (Public)
const searchProducts = async (req, res) => {
  const { search, sort } = req.query;
  let query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
    0;
  }

  let products = await Product.find(query);

  if (sort) {
    const sortOrder = sort === "asc" ? 1 : -1;
    products = products.sort((a, b) => (a.price - b.price) * sortOrder);
  }

  res.status(200).json({ msg: "searching completed!", products });
};




const deleteProduct =async (req,res)=>{
 try{
  const productId = req.params.productId;

  //find the product by id
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
   // Remove the product image file from the server

   if (product.productImage) {
    // Extract the file name from the product image URL
    const imagePath = path.join(__dirname, `../../uploads/products/${path.basename(product.productImage)}`);
    
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Failed to delete image:', err);
      }
    });
  }

  // Delete the product from the database
  await Product.findByIdAndDelete(productId);
  return res.status(200).json({ msg: "Product deleted successfully" });


 }
 catch (err) {
  console.log(err);
  return res.status(500).json({ msg: "server error", error: err.message });
}


}

module.exports = {
  createProduct,
  searchProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
};
