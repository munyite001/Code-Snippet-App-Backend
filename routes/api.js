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
 *     summary: Welcome to the API
 *     description: Redirects to /api/users
 *     responses:
 *       200:
 *         description: Welcome message
 */
router.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// ==============================
// Users Routes
// ==============================

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post("/auth/register", usersController.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user and get token
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
router.post("/auth/login", usersController.loginUser);

/**
 * @swagger
 * /api/auth/google-login:
 *   post:
 *     summary: Login a user with Firebase Google Auth
 *     description: Authenticates a user using Google Firebase and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idToken
 *             properties:
 *               idToken:
 *                 type: string
 *                 example: "google-id-token"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
router.post("/auth/google-login", usersController.googleLogin);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users (Admin only).
 *     security:
 *       - bearerAuth: []
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
 *     description: Retrieves a user by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 */
router.get("/users/:id", verifyToken, usersController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates a user's details by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */
router.delete("/users/:id", verifyToken, usersController.deleteUserById);

/**
 * @swagger
 * /api/user/favorites:
 *   post:
 *     summary: Toggle Favorites
 *     description: Adds or removes a snippet from the user's favorites.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - snippetId
 *             properties:
 *               snippetId:
 *                 type: string
 *                 example: "snippet-id"
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
 *     description: Retrieves all snippets favorited by the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorites retrieved successfully.
 */
router.get("/user/favorites", verifyToken, usersController.getAllUserFavorites);

// ==============================
// Tags Routes
// ==============================

/**
 * @swagger
 * /api/tags/all:
 *   get:
 *     summary: Get all tags
 *     description: Retrieves a list of all tags (Admin only).
 *     security:
 *       - bearerAuth: []
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
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user tags retrieved successfully.
 */
router.get("/user/tags/all", verifyToken, tagsController.getAllUserTags);

/**
 * @swagger
 * /api/user/tags/{id}:
 *   get:
 *     summary: Get a user tag by ID
 *     description: Retrieves a tag by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag retrieved successfully.
 */
router.get("/user/tags/:id", verifyToken, tagsController.getUserTagById);

/**
 * @swagger
 * /api/user/tags:
 *   post:
 *     summary: Create a new user tag
 *     description: Creates a new tag for the user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "JavaScript"
 *     responses:
 *       201:
 *         description: Tag created successfully.
 */
router.post("/user/tags", verifyToken, tagsController.createUserTag);

/**
 * @swagger
 * /api/user/tags/{id}:
 *   put:
 *     summary: Update a user tag by ID
 *     description: Updates a tag by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Tag Name"
 *     responses:
 *       200:
 *         description: Tag updated successfully.
 */
router.put("/user/tags/:id", verifyToken, tagsController.updateTagById);

/**
 * @swagger
 * /api/user/tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     description: Deletes a tag by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag deleted successfully.
 */
router.delete("/user/tags/:id", verifyToken, tagsController.deleteUserTagById);

// ==============================
// Snippets Routes
// ==============================

/**
 * @swagger
 * /api/snippets/all:
 *   get:
 *     summary: Get all user snippets
 *     description: Retrieves all snippets (Admin only).
 *     security:
 *       - bearerAuth: []
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
 *     description: Retrieves all snippets created by the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user snippets retrieved successfully.
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
 *     description: Retrieves a snippet by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The snippet ID
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
 *     description: Creates a new snippet for the user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My Snippet"
 *               content:
 *                 type: string
 *                 example: "console.log('Hello World');"
 *     responses:
 *       201:
 *         description: Snippet created successfully.
 */
router.post(
    "/user/snippets",
    verifyToken,
    snippetsController.createUserSnippet
);

/**
 * @swagger
 * /api/user/snippets/{id}:
 *   put:
 *     summary: Update a user snippet by ID
 *     description: Updates a snippet by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The snippet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Snippet Title"
 *               content:
 *                 type: string
 *                 example: "console.log('Updated Content');"
 *     responses:
 *       200:
 *         description: Snippet updated successfully.
 */
router.put(
    "/user/snippets/:id",
    verifyToken,
    snippetsController.updateUserSnippetsById
);

/**
 * @swagger
 * /api/user/snippets/{id}:
 *   delete:
 *     summary: Delete a user snippet by ID
 *     description: Deletes a snippet by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The snippet ID
 *     responses:
 *       200:
 *         description: Snippet deleted successfully.
 */
router.delete(
    "/user/snippets/:id",
    verifyToken,
    snippetsController.deleteUserSnippetById
);

/**
 * @swagger
 * /api/snippet/tags/{id}:
 *   get:
 *     summary: Get all snippet tags
 *     description: Retrieves all tags associated with a snippet.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The snippet ID
 *     responses:
 *       200:
 *         description: List of snippet tags retrieved successfully.
 */
router.get(
    "/snippet/tags/:id",
    verifyToken,
    snippetsController.getAllSnippetTags
);

module.exports = router;