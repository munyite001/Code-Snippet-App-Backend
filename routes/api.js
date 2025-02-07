var express = require("express");
var router = express.Router();
const { verifyToken } = require("../middleware/middleware");
const usersController = require("../controllers/users.controller");
const tagsController = require("../controllers/tags.controller");

// @route   GET /api
// @desc    Redirect to /api/users
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Users routes

// @desc    Register a new user
router.post("/auth/register",  usersController.registerUser);

// @desc    Login a user and get token
router.post("/auth/login", usersController.loginUser);

// @desc    Get all users
router.get("/users/all", verifyToken, usersController.getAllUsers);

// @desc    Get a user by ID
router.get("/users/:id", verifyToken, usersController.getUserById);

// @desc    Update a user by ID
router.put("/users/:id", verifyToken, usersController.updateUserById);

// @desc    Delete a user by ID
router.delete("/users/:id", verifyToken, usersController.deleteUserById);



// Tags routes

// @desc    Get all tags
router.get("/tags/all", verifyToken, tagsController.getAllTags);

// @desc    Get a tag by ID
router.get("/tags/:id", verifyToken, tagsController.getTagById);

// @desc    Create a new tag
router.post("/tags", verifyToken, tagsController.createTag);

// @desc    Update a tag by ID
router.put("/tags/:id", verifyToken, tagsController.updateTagById);

// @desc    Delete a tag by ID
router.delete("/tags/:id", verifyToken, tagsController.deleteTagById);



module.exports = router;