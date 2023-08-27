const express = require('express');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {

    const tokenValue = req.headers.authorization;
    // console.log(tokenValue);
    const tokenParts = tokenValue.split(' ');
    const token = tokenParts[1];
    // console.log(token);
    // console.log(tokenValue);

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: err });
        }
        req.user = decoded;
        // console.log(req.user);
        next();
    });

};
