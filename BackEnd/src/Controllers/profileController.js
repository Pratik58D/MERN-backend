const Profile = require("../models/profilemodel")


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
        const profileUpdate = await Profile.updateOne({user:userId} ,{
            full_name : full_name ? full_name : profile.full_name,
            phone : phone ? phone : profile.phone,
            address : address ? address : profile.address,
        })



        return res.status(200).json({msg:"Profile updated sucessfully ",profileUpdate});


    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg : "Server Error",error:err.message})
    }
}


//function to retrive the data from the database
const getProfiles = async (req,res)=>{

    try{
        const profiles = await Profile.find(); //retrives all profiles
        return res.status(200).json(profiles)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Failed to retrieve profiles" });
    }
    
};


module.exports =  {getProfiles,UpdateProfile};