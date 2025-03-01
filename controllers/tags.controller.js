const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// @desc    Get all tags
exports.getAllTags = asyncHandler(async (req, res) => {
    const tags = await prisma.tags.findMany();
    res.json(tags);
});

// @desc get all user tags
exports.getAllUserTags = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const userTags = await prisma.tags.findMany({
        where: {
            userId: userId
        }
    });

    res.json(userTags);
});

// @desc    Get a user tag by ID
exports.getUserTagById = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const tagId = req.params.id;

    const userTag = await prisma.tags.findUnique({
        where: {
            id: parseInt(tagId),
            userId: userId
        }
    });

    if (!userTag) {
        return res.status(404).json({ message: "Tag not found" });
    }

    res.json(userTag);
});

// @desc    Create a new user tag
exports.createUserTag = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const tagExists = await prisma.tags.findFirst({
        where: {
            name: name,
            userId: userId
        }
    });

    if (tagExists) {
        return res
            .status(400)
            .json({ message: "Tag with this name already exists" });
    }

    const tag = await prisma.tags.create({
        data: {
            name: name,
            userId: userId
        }
    });

    res.status(200).json({ message: "Tag Added Successfully", tag });
});

// @desc    Update a user tag by ID
exports.updateTagById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const tag = await prisma.tags.findUnique({
        where: {
            id: parseInt(id),
            userId: userId
        }
    });

    if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
    }

    const updatedTag = await prisma.tags.update({
        where: {
            id: parseInt(id),
            userId: userId
        },
        data: {
            name
        }
    });

    res.status(201).json({ message: "Tag Updated Successfully", updatedTag });
});

// @desc    Delete a tag by ID
exports.deleteUserTagById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const tag = await prisma.tags.findUnique({
        where: {
            id: parseInt(id),
            userId: userId
        }
    });

    if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
    }

    await prisma.tags.delete({
        where: {
            id: parseInt(id),
            userId: userId
        }
    });

    res.json({ message: "Tag deleted SuccessFully" });
});
