const Product = require('../models/productModel');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      stock,
    } = req.body;

    // Checking if a product with the same name exists in a different category
    const existingProduct = await Product.findOne({ name });

    if (existingProduct && existingProduct.category.toString() !== category) {
      return res.status(401).json({ msg: 'Same product cannot belong to multiple categories' });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
    });

    const response = await newProduct.save();
    return res.status(201).json({ msg: 'Product created successfully', newProduct: response });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ msg: 'Server error' });
  }
};


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
// Search and sort products (Public)
const searchProducts = async (req, res) => {
    const { search, sort } = req.query;
    let query = {};
    if (search) {   
      query.name = { $regex: search, $options: "i" };0
    }
  
    let products = await Product.find(query);
  
    if (sort) {
      const sortOrder = sort === "asc" ? 1 : -1;
      products = products.sort((a, b) => (a.price - b.price) * sortOrder);
    }
  
    res.status(200).json({msg:"searching completed!",products});
  };
  

module.exports = { createProduct, searchProducts };
