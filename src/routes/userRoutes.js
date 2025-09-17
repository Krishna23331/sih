const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require("../controllers/userController");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/profile", userController.getProfile);

module.exports = router;
