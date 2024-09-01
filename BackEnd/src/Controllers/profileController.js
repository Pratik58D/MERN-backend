const Profile = require("../models/profilemodel")

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


module.exports =  {getProfiles};