const Profile = require("../models/profilemodel")

const showProfile = async(req,res)=>{
    const data = req.body;
    if(!data.id || !data.full_name || !data.email || !data.phone || !data.address){
        return res.status(400).json({msg:"please enter all fields"})
    }
    try{
        const newprofile = new Profile(
            {
                id: data.id,
                full_name: data.full_name,
                email: data.email,
                phone: data.phone,
                address: data.address,
            });
            const response = await newprofile.save();
            return res.status(201).json({msg:"data saved"})
    }
    catch(err){
        console.log(err);

    }
};



//function to retrive the data from the database
const getProfiles = async (req,res)=>{

    try{
        const profiles = await Profile.find(); //retrives all profiles
        res.status(200).json(profiles)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Failed to retrieve profiles" });
    }
    
};


// Function to get a profile by ID
const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({ id: req.params.id }); // Finds profile by ID
        if (!profile) {
            return res.status(404).json({ msg: "Profile not found" });
        }
        res.status(200).json(profile);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Failed to retrieve profile" });
    }
};




module.exports = {showProfile,getProfiles,getProfileById};