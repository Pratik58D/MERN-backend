const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
   password:{
        type: String,
        required:true,
       }

});

//create the user model

const User = mongoose.model("user",userSchema);
module.exports = User;