const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
const Profile = require("../models/profilemodel");
dotenv.config();

const resgisterUser = async (req, res) => {
  const data = req.body;
  // const name = data.name;
  // const email = data.email;
  // const password = data.password;
  if (!data.email || !data.password) {
    return res.status(400).json({ msg: "please enter the email and password" });
  }
  try {
    const user = await User.findOne({ email: data.email });
    if (user) {
      return res.status(400).json({ msg: "user already exists" });
    }
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      userRole: data.userRole,
    });


    const profile = await Profile.findOne({user: newUser._id});
    if(profile){
      return res.status(400).json({md:"profile already exits"})

    }
    const newProfile = new Profile({
      user : newUser._id
    });


    const response = await newUser.save();
    const ProfileResponse = await newProfile.save();

    return res
      .status(201)
      .json({ 
        msg: "user registration sucessfull",
         user: response ,
        profile: ProfileResponse});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error", error: err });
  }
};

//function to retrive the data
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return  res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "failed  to retrive users" });
  }
};


// controller for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // const data=req.body;
  // const email=data.email;
  // const password=data.password;

  try {
    //email: email can be written as email only if the database and req field matches
    //first one indicates the databse email where second one indicates req.body

    // let user = await User.findOne({ email: "test@example.com" });
    // let user = await User.findOne({email: email });

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id, //this will automatically understant this id = _id
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: "user logged in successfully",
          token: `${token}`,
          user: user,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ msg: "Unable to login", error });
  }
};

module.exports = { resgisterUser, getUsers,loginUser };
