const mongoose = require("mongoose");
const schema = mongoose.Schema;


const profileSchema = new schema({
    id:{
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
   phone:{
        type: String,
        required:true,
       },
   address:{
        type: String,
        required:true,
       },
});


// creating the profile model
const Profile = mongoose.model("profile",profileSchema);
module.exports = Profile;

