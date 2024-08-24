const User = require("../models/userModel");

const  resgisterUser = async(req,res) =>{
    const data = req.body;
    // const name = data.name;
    // const email = data.email;
    // const password = data.password;
    if(!data.email || !data.password){
        res.status(400).json({msg:"please enter the email and password"})
    }
    try{

        const user =  await User.findOne({email:data.email})
        if(user){
            res.status(400).json({msg:"user already exists"});
        }
        const newUser = new User({
            name: data.name,
            email: data.name,
            password: data.name,
        });
       const response =await newUser.save();
        res.status(201).json({msg:"user registration sucessfull",user:response});
        

        }
        catch(err){
            console.log(err);
            res.status(500).json({msg:"server error",error :err})

        }
}



module.exports = {resgisterUser}

