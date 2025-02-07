const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// @desc    Register a new user
exports.registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    //  Check if the user exists
    const userExists = await prisma.users.findUnique({
        where: {
            email: email
        }
    });

    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        throw new Error("User already exists");
    }

    //  Check if that username is already taken
    const usernameExists = await prisma.users.findFirst({
        where: {
            userName: userName
        }
    });

    if (usernameExists) {
        res.status(400).json({ message: "Username already taken" });
        throw new Error("Username already taken");
    }

    //  Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create the user
    await prisma.users.create({
        data: {
            userName,
            email,
            password: hashedPassword
        }
    });

    res.status(201).json({ message: "User created successfully" });
});

// @desc    Login a user and get token
exports.loginUser = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;

    //  Check if the user exists
    const user = await prisma.users.findFirst({
        where: {
            userName: userName
        }
    });

    if (!user) {
        res.status(404).json({ message: "User Not Found" });
        throw new Error("User Not Found");
    }

    //  Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        throw new Error("Invalid credentials");
    }

    //  Create a token
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: "1d"
    });

    res.json({ token });
});

// @desc    Get All Users
exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await prisma.users.findMany();

    res.json(users);
});

// @desc    Get User by ID
exports.getUserById = asyncHandler(async (req, res) => {
    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        throw new Error("User not found");
    }

    res.json(user);
});

// @desc    Update User by ID
exports.updateUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { userName, email, password } = req.body;

    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        throw new Error("User not found");
    }

    let updateData = {}; // Object to store the fields to be updated

    // Check if username is provided and not already taken
    if (userName && userName !== user.userName) {
        const existingUser = await prisma.users.findFirst({
            where: { userName }
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }
        updateData.userName = userName;
    }

    // Check if email is provided and not already taken
    if (email && email !== user.email) {
        const existingEmail = await prisma.users.findUnique({
            where: { email }
        });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }
        updateData.email = email;
    }

    // Check if password is provided and hash it
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
    }

    // If no fields are provided for update, return an error
    if (Object.keys(updateData).length === 0) {
        return res
            .status(400)
            .json({ message: "No valid fields provided for update" });
    }

    // Update the user in the database
    const updatedUser = await prisma.users.update({
        where: { id: parseInt(id) },
        data: {
            ...updateData,
            updatedAt: new Date()
        }
    });

    res.json({ message: "User updated successfully", user: updatedUser });
});

// @desc    Delete User by ID
exports.deleteUserById = asyncHandler(async (req, res) => {
    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        throw new Error("User not found");
    }

    //  Soft Delete the user
    await prisma.users.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            isDeleted: true
        }
    });

    res.json({ message: "User deleted successfully" });
});
