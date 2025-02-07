import usersController from "../controllers/users.controller"
var express = require("express");
var router = express.Router();
import { verifyToken } from "../middleware/middleware";

// @desc    Register a new user
router.post("/register",  usersController.registerUser);

// @desc    Login a user and get token
router.post("/login", usersController.loginUser);

// @desc    Get all users
router.get("/users/all", verifyToken, usersController.getAllUsers);

// @desc    Get a user by ID
router.get("/users/:id", verifyToken, usersController.getUserById);



module.exports = router;