const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// @desc    Get all tags
exports.getAllTags = asyncHandler(async (req, res) => {
    const tags = await prisma.tags.findMany();
    res.json(tags);
});

// @desc    Get a tag by ID
exports.getTagById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const tag = await prisma.tags.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!tag) {
        res.status(404).json({ message: "Tag not found" });
        throw new Error("Tag not found");
    }

    res.json(tag);
});

// @desc    Create a new tag
exports.createTag = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ message: "Name is required" });
        throw new Error("Name is required");
    }

    const tag = await prisma.tags.create({
        data: {
            name
        }
    });

    res.json(tag);
});


// @desc    Update a tag by ID
exports.updateTagById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { name } = req.body;

    if (!name) {
        res.status(400).json({ message: "Name is required" });
        throw new Error("Name is required");
    }

    const tag = await prisma.tags.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!tag) {
        res.status(404).json({ message: "Tag not found" });
        throw new Error("Tag not found");
    }

    const updatedTag = await prisma.tags.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name
        }
    });

    res.json(updatedTag);
})

// @desc    Delete a tag by ID
exports.deleteTagById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const tag = await prisma.tags.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!tag) {
        res.status(404).json({ message: "Tag not found" });
        throw new Error("Tag not found");
    }

    await prisma.tags.delete({
        where: {
            id: parseInt(id)
        }
    });

    res.json({ message: "Tag deleted" });
});


