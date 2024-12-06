const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();

// Define the /login route
router.post('/login', loginUser);

// Define the /register route
router.post('/register', registerUser);

module.exports = router;
