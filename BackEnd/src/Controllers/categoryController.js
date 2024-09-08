const Category = require("../models/categorymodel");



const createCategory = async(req,res)=>{

    const {name , description} = req.body;
     // Check if the name is provided
    if(!name){
        return res.status(400).json({msg:"please enter the name of category"});
    }
    try{
         // Check if the category already exists
        const matchCategory = await Category.findOne({name : name});
        if (matchCategory){
            return res.status(400).json({msg:"category already exists"});
        }
        // Create a new category
        const newCategory =  new Category({
            name :name,
            description : description
            })
    // Save the new category to the database
        const response =  await newCategory.save()
        return res.status(201).json({msg:"new  category is created",category : response});
    }
    catch(err){
        console.log(err);
        return res.status(501).json({msg:"server error"})
    }
}


const searchAll = async(req,res) =>{
    try{
        const Categories = await Category.find();
         return res.status(201).json(Categories)
    }catch(err){
        console.log("error on finding the all category");
        return res.status(501).json({msg:"Server Error"});
    }
}

module.exports = {createCategory,searchAll};