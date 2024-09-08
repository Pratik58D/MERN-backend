const Profile = require("../models/profilemodel");

const dotenv = require("dotenv");
dotenv.config();

const domain = process.env.DOMAIN;


//update user Profile
const UpdateProfile = async(req,res) =>{
    try{
        // get user id from tokken
        const userId = req.user.id;
        const profile = await Profile.findOne({user: userId});
        if(!profile){
            return res.status(404).json({msg:"profile not found"})
        }

        const {full_name,phone,address} = req.body;
        const profileData ={
                full_name : full_name ? full_name : profile.full_name,
                phone : phone ? phone : profile.phone,
                address : address ? address : profile.address,
            };
     
            if(req.file){
                console.log(req.file)
                profileData.profilePic = `${domain}uploads/profiles/${req.file.filename}`;
            }
            
        const profileUpdate = await Profile.updateOne(
            {user:userId} ,
            {$set : profileData},
    );
        return res.status(200).json(
            {msg:"Profile updated sucessfully ",
                profileUpdate,
            profile});
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg : "Server Error",error:err.message})
    }
}


//function to retrive the data from the database
const getProfiles = async (req,res)=>{

    try{
        const userId = req.user.id;

        const profile = await Profile.findOne({user : userId}).populate("user",["name","email","userRole"]); 
        if(!profile){
            return res.status(404).json({msg:"profile not found"})
        }
        return res.status(200).json({msg: "profile found sucessfully",profile: profile})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Failed to retrieve profiles" });
    }
    
};


//controller to delete user profile
const deleteProfile = async(req,res) =>{
    try{
        const userId = req.user.id;
        const profile = await Profile.findOneAndDelete({user:userId})
        if(!profile){
            return res.status(404).json({msg:"Profile not found"})
        }
        return res.status(200).json({msg: "profile delete sucessfully",profile: profile})
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ msg: "Failed to retrieve profiles" });

    }
}

module.exports =  {getProfiles,UpdateProfile,deleteProfile};