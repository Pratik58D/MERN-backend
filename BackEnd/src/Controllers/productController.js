const { response } = require("express");
const Product = require("../models/productModel");


const createProduct  = async(req,res) =>{
    try{

        const {
            name,
            price,
            description,
            category,
            stock
        } = req.body;

 // Check if a product with the same name exists with a different category

        const existingProduct = await Product.findOne({name });

        if(existingProduct && existingProduct.category.toString()!== category){
            return res.status(401).json({ msg: "Same product cannot belong to multiple categories" });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            category,
            stock

        })

        const response = await newProduct.save();
        return res.status(201).json({msg:"data saved",newPoduct : response})
    }
    catch(err){
        console.log(err);
        return res.status(501).json({msg:"server error"})
    }
}


module.exports = {createProduct};