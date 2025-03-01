var express = require("express");
var router = express.Router();
const { verifyToken, checkAdmin } = require("../middleware/middleware");
const usersController = require("../controllers/users.controller");
const tagsController = require("../controllers/tags.controller");
const snippetsController = require("../controllers/snippets.controller");

// @route   GET /api
// @desc    Redirect to /api/users
router.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Users routes

// @desc    Register a new user
router.post("/auth/register", usersController.registerUser);

// @desc    Login a user and get token
router.post("/auth/login", usersController.loginUser);

// @desc    Login a user with firebase google auth
router.post("/auth/google-login", usersController.googleLogin);

// @desc    Get all users
router.get("/users/all", verifyToken, checkAdmin, usersController.getAllUsers);

// @desc    Get a user by ID
router.get("/users/:id", verifyToken, usersController.getUserById);

// @desc    Update a user by ID
router.put("/users/:id", verifyToken, usersController.updateUserById);

// @desc    Delete a user by ID
router.delete("/users/:id", verifyToken, usersController.deleteUserById);

// @desc    Toggle Favorites
router.post("/user/favorites", verifyToken, usersController.toggleFavorites);

// @desc    Get all user favorites
router.get("/user/favorites", verifyToken, usersController.getAllUserFavorites);

// Tags routes

// @desc    Get all tags
router.get("/tags/all", verifyToken, checkAdmin, tagsController.getAllTags);

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

// Snippets routes

// @desc    Get all user snippets
router.get(
    "/snippets/all",
    verifyToken,
    checkAdmin,
    snippetsController.getAllSnippets
);

// @desc    Get all user snippets
router.get(
    "/user/snippets/all",
    verifyToken,
    snippetsController.getAllUserSnippets
);

// @desc    Get a user snippet by ID
router.get(
    "/user/snippets/:id",
    verifyToken,
    snippetsController.getUserSnippetById
);

// @desc    Create a new user snippet
router.post(
    "/user/snippets",
    verifyToken,
    snippetsController.createUserSnippet
);

// @desc    Update a user snippet by ID
router.put(
    "/user/snippets/:id",
    verifyToken,
    snippetsController.updateUserSnippetsById
);

// @desc    Delete a user snippet by ID
router.delete(
    "/user/snippets/:id",
    verifyToken,
    snippetsController.deleteUserSnippetById
);

// @desc    Get all snippet Tags
router.get(
    "/snippet/tags/:id",
    verifyToken,
    snippetsController.getAllSnippetTags
);

module.exports = router;
