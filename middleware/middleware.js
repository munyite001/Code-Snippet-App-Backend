require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ message: "Access Denied. Invalid token." });
    }
};


module.exports = { verifyToken };