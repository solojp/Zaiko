import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generatetoken.js';
import User from '../models/User.js';
import validator from 'validator';

// login user
const loginUser = asyncHandler(async (req, res) => {
  //grab email and password
  const { email, password } = req.body;
  
});

// signup user
const signupUser = asyncHandler(async (req, res) => {
  //Grab email and password from response
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      res.status(400);
      throw new Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
      res.status(400);
      throw new Error('Password is not strong enough');
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    
    //Create user
    const user = await User.create({ name, email, password });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
      });
    } else {
      res.status(400);
      throw new Error('Something went wrong');
    }
});

//Logout User
const logoutUser = asyncHandler(async(req, res) => {
  res.status(200).json({ message: 'Logout User'});
});

//Get user profile
const getUserProfile = asyncHandler(async(req, res) => {
  res.status(200).json({ message: 'User profile'});
});

//Update user profile
const updateUserProfile = asyncHandler(async(req, res) => {
  res.status(200).json({ message: 'Update user profile'});
});

export { signupUser, loginUser, logoutUser, getUserProfile, updateUserProfile };
