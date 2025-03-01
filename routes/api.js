var express = require("express");
var router = express.Router();
const { verifyToken, checkAdmin } = require("../middleware/middleware");
const usersController = require("../controllers/users.controller");
const tagsController = require("../controllers/tags.controller");
const snippetsController = require("../controllers/snippets.controller");

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Welcome message for the API
 *     description: Returns a welcome message.
 *     responses:
 *       200:
 *         description: Successful response.
 */
router.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Users routes

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post("/auth/register", usersController.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns a token.
 *     responses:
 *       200:
 *         description: Login successful.
 */
router.post("/auth/login", usersController.loginUser);

/**
 * @swagger
 * /api/auth/google-login:
 *   post:
 *     summary: Login with Google Auth
 *     description: Authenticates a user using Firebase Google Authentication.
 *     responses:
 *       200:
 *         description: Google login successful.
 */
router.post("/auth/google-login", usersController.googleLogin);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users. Requires admin access.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 */
router.get("/users/all", verifyToken, checkAdmin, usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves user details by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 */
router.get("/users/:id", verifyToken, usersController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates user details by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully.
 */
router.put("/users/:id", verifyToken, usersController.updateUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */
router.delete("/users/:id", verifyToken, usersController.deleteUserById);

/**
 * @swagger
 * /api/user/favorites:
 *   post:
 *     summary: Toggle favorites
 *     description: Adds or removes a snippet from favorites.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Favorite toggled successfully.
 */
router.post("/user/favorites", verifyToken, usersController.toggleFavorites);

/**
 * @swagger
 * /api/user/favorites:
 *   get:
 *     summary: Get all user favorites
 *     description: Retrieves all favorited snippets.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Favorites retrieved successfully.
 */
router.get("/user/favorites", verifyToken, usersController.getAllUserFavorites);

// Tags routes

/**
 * @swagger
 * /api/tags/all:
 *   get:
 *     summary: Get all tags
 *     description: Returns all tags. Requires admin access.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of tags retrieved successfully.
 */
router.get("/tags/all", verifyToken, checkAdmin, tagsController.getAllTags);

/**
 * @swagger
 * /api/user/tags/all:
 *   get:
 *     summary: Get all user tags
 *     description: Retrieves all tags created by the user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tags retrieved successfully.
 */
router.get("/user/tags/all", verifyToken, tagsController.getAllUserTags);

// Snippets routes

/**
 * @swagger
 * /api/snippets/all:
 *   get:
 *     summary: Get all snippets
 *     description: Retrieves all code snippets. Requires admin access.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of snippets retrieved successfully.
 */
router.get(
    "/snippets/all",
    verifyToken,
    checkAdmin,
    snippetsController.getAllSnippets
);

/**
 * @swagger
 * /api/user/snippets/all:
 *   get:
 *     summary: Get all user snippets
 *     description: Retrieves all snippets created by the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Snippets retrieved successfully.
 */
router.get(
    "/user/snippets/all",
    verifyToken,
    snippetsController.getAllUserSnippets
);

/**
 * @swagger
 * /api/user/snippets/{id}:
 *   get:
 *     summary: Get a user snippet by ID
 *     description: Retrieves a specific snippet created by the user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Snippet ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Snippet retrieved successfully.
 */
router.get(
    "/user/snippets/:id",
    verifyToken,
    snippetsController.getUserSnippetById
);

/**
 * @swagger
 * /api/user/snippets:
 *   post:
 *     summary: Create a new user snippet
 *     description: Allows a user to create a new code snippet.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Snippet created successfully.
 */
router.post(
    "/user/snippets",
    verifyToken,
    snippetsController.createUserSnippet
);

module.exports = router;
