const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// @desc    Get all Snippets
exports.getAllSnippets = asyncHandler(async (req, res) => {
    const snippets = await prisma.snippets.findMany();
    res.json(snippets);
});

// @desc get all user snippets
exports.getAllUserSnippets = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const userSnippets = await prisma.snippets.findMany({
        where: {
            userId: userId
        }
    });

    res.json(userSnippets);
});

// @desc    Get a user snippet by ID
exports.getUserSnippetById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const userSnippet = await prisma.snippets.findUnique({
        where: {
            id: parseInt(id),
            userId: userId
        }
    });

    if (!userSnippet) {
        return res.status(404).json({ message: "Snippet not found" });
    }

    res.json(userSnippet);
});

// @desc    Create a new user snippet
exports.createUserSnippet = asyncHandler(async (req, res) => {
    const { title, description, code, language } = req.body;

    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    if (!description) {
        return res.status(400).json({ message: "Description is required" });
    }

    if (!code) {
        return res.status(400).json({ message: "Code is required" });
    }

    if (!language) {
        return res.status(400).json({ message: "Language is required" });
    }

    const snippet = await prisma.snippets.create({
        data: {
            title: title,
            description: description,
            code: code,
            language: language,
            userId: userId
        }
    });

    res.status(201).json(snippet);
});

// @desc    Update a user snippet by ID
exports.updateUserSnippetsById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const { title, description, code, language } = req.body;

    const userSnippet = await prisma.snippets.findUnique({
        where: {
            id: parseInt(id),
            userId: userId
        }
    });

    if (!userSnippet) {
        return res.status(404).json({ message: "Snippet not found" });
    }

    let updateData = {}; // Object to store the fields to be updated

    // Check if title is provided
    if (title && title !== userSnippet.title) {
        updateData.title = title;
    }

    // Check if description is provided
    if (description && description !== userSnippet.description) {
        updateData.description = description;
    }

    // Check if code is provided
    if (code && code !== userSnippet.code) {
        updateData.code = code;
    }

    // Check if language is provided
    if (language && language !== userSnippet.language) {
        updateData.language = language;
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No changes detected" });
    }

    const updatedSnippet = await prisma.snippets.update({
        where: {
            id: parseInt(id)
        },
        data: {
            ...updateData,
            updatedAt: new Date()
        }
    });

    res.json({ message: "Snippet updated successfully", snippet: updatedSnippet });
});

// @desc    Delete a snippet by ID
exports.deleteUserSnippetById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const userSnippet = await prisma.snippets.findUnique({
        where: {
            id: parseInt(id),
            userId: userId
        }
    });

    if (!userSnippet) {
        return res.status(404).json({ message: "Snippet not found" });
    }

    await prisma.snippets.delete({
        where: {
            id: parseInt(id)
        }
    });

    res.json({ message: "Snippet deleted successfully" });
});