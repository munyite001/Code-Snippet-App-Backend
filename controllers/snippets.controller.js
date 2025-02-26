const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// @desc    Get all Snippets
exports.getAllSnippets = asyncHandler(async (req, res) => {
    const snippets = await prisma.snippets.findMany({
        include: {
            tags: {
                include: {
                    tag: true
                }
            }
        }
    });
    res.json(snippets);
});

// @desc get all user snippets
exports.getAllUserSnippets = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const userSnippets = await prisma.snippets.findMany({
        where: {
            userId: userId
        },
        include: {
            tags: {
                include: {
                    tag: true
                }
            }
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
    const { title, description, code, language, tags } = req.body;

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

    if (tags && Array.isArray(tags) && tags.length > 0) {
        //  Check if the tags exist in the database
        const existingTags = await prisma.tags.findMany({
            where: {
                id: { in: tags },
                userId: userId
            }
        });

        //  If all existing tags exist and belong to the user, add the tags to the snippet_tags table
        if (existingTags.length === tags.length) {
            await prisma.snippet_tags.createMany({
                data: tags.map((tagId) => ({
                    snippet_id: snippet.id,
                    tag_id: tagId
                }))
            });
        } else {
            return res.status(400).json({
                message:
                    "One or more tags do not exist or do not belong to the user"
            });
        }
    }

    res.status(201).json({ message: "Snippet created successfully", snippet });
});

// @desc    Update a user snippet by ID
exports.updateUserSnippetsById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    const { title, description, code, language, tags } = req.body;

    const userSnippet = await prisma.snippets.findUnique({
        where: { id, userId }
    });

    if (!userSnippet) {
        return res.status(404).json({ message: "Snippet not found" });
    }

    let updateData = {};

    if (title && title !== userSnippet.title) updateData.title = title;
    if (description && description !== userSnippet.description)
        updateData.description = description;
    if (code && code !== userSnippet.code) updateData.code = code;
    if (language && language !== userSnippet.language)
        updateData.language = language;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No changes detected" });
    }

    const updatedSnippet = await prisma.snippets.update({
        where: { id },
        data: { ...updateData, updatedAt: new Date() }
    });

    if (tags && Array.isArray(tags) && tags.length > 0) {
        // 1. Remove existing snippet-tag relationships
        await prisma.snippet_tags.deleteMany({
            where: { snippet_id: id }
        });

        // 2. Validate that the tags exist and belong to the user
        const existingTags = await prisma.tags.findMany({
            where: { id: { in: tags }, userId }
        });

        if (existingTags.length !== tags.length) {
            return res.status(400).json({
                message:
                    "One or more tags do not exist or do not belong to the user"
            });
        }

        // 3. Insert new relationships
        await prisma.snippet_tags.createMany({
            data: tags.map((tagId) => ({
                snippet_id: updatedSnippet.id,
                tag_id: tagId
            }))
        });
    }

    res.status(200).json({
        message: "Snippet Updated successfully",
        snippet: updatedSnippet
    });
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

exports.getAllSnippetTags = asyncHandler(async (req, res) => {
    const snippetId = req.params.id;

    const snippetTags = await prisma.snippet_tags.findMany({
        where: {
            snippet_id: parseInt(snippetId)
        },
        include: {
            tag: true
        }
    });

    res.json(snippetTags);
});
