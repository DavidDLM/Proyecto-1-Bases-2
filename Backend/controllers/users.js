const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/userModel");
// const VerificationToken = require("../models/verificationTokenModel");
const jwt = require("jsonwebtoken");
const path = require("path");

const signUpController = async (req, res) => {
    console.log({ ...req.body });
    // const {name, email, password} = req.body;
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 11);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const { password, ...rest } = user._doc;
            // const randomStr = crypto.randomBytes(128).toString("hex");
            res.status(200).send({
                msg: "Signup Successful. Please login to continue!",
                data: {
                    ...rest,
                },
                status: 200,
            });
        }
    });
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).send({ msg: "Authentication Failed!" });
        } else {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const payload = {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id,
                };
                const accessToken = jwt.sign(
                    { ...payload },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn: "30d",
                    }
                );
                const { password, ...rest } = user._doc;

                res.status(200).json({
                    ...rest,
                    accessToken: accessToken,
                    msg: "Login Successful!",
                    status: 200,
                });
            } else {
                res.status(401).send({ msg: "Authentication Failed!" });
            }
        }
    } catch (err) {
        res.status(401).send({ msg: "Authentication Failed!" });
    }
};

module.exports = {
    signUpController,
    loginController,
};
