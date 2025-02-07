import { PrismaClient } from '@prisma/client';
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const prisma = new PrismaClient();

// @desc    Register a new user
exports.registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    //  Check if the user exists
    const userExists = await prisma.users.findUnique({
        where: {
            email: email,
        }
    });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        throw new Error('User already exists');
    }

    //  Check if that username is already taken
    const usernameExists = await prisma.users.findUnique({
        where: {
            userName: userName,
        }
    });

    if (usernameExists) {
        res.status(400).json({ message: 'Username already taken' });
        throw new Error('Username already taken');
    }

    //  Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create the user
    await prisma.users.create({
        data: {
            userName,
            email,
            password: hashedPassword,
        }
    });

    res.status(201).json({ message: 'User created successfully' });
});

// @desc    Login a user and get token
exports.loginUser = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;

    //  Check if the user exists
    const user = await prisma.users.findUnique({
        where: {
            userName: userName,
        }
    });

    if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        throw new Error('Invalid credentials');
    }

    //  Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        throw new Error('Invalid credentials');
    }

    //  Create a token
    const token = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '1d' });

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
            id: parseInt(req.params.id),
        }
    });

    res.json(user);
});

// @desc    Update User by ID


