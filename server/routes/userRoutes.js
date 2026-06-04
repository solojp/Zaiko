import express from 'express';
const router = express.Router();

//controller functions
import { signupUser, loginUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';

//login route
router.post('/login', loginUser);
//signup route
router.post('/signup', signupUser);
//logout route
router.post('/logout', logoutUser);
// profile routes
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;