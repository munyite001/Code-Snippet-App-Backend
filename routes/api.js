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

// @desc    Get all user tags
router.get("/user/tags/all", verifyToken, tagsController.getAllUserTags);

// @desc    Get a user tag by ID
router.get("/user/tags/:id", verifyToken, tagsController.getUserTagById);

// @desc    Create a new user tag
router.post("/user/tags", verifyToken, tagsController.createUserTag);

// @desc    Update a user tag by ID
router.put("/user/tags/:id", verifyToken, tagsController.updateTagById);

// @desc    Delete a tag by ID
router.delete("/user/tags/:id", verifyToken, tagsController.deleteUserTagById);



module.exports = router;