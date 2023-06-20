const User = require("../models/userSchema");
const jsonwebtoken = require("jsonwebtoken");

const logInUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        res.status(401).json({ status: "Invalid email and password" });
        return;
    } else if (user.password === password) {
        const token = jsonwebtoken.sign({ userId: user._id }, "secret", { expiresIn: 1440 });
        res.status(200).json({ status: token });
    }
}

const signUpUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (user) {
        res.status(401).json({ status: "User Already Existed!" });
    } else {
        const newUser = User({
            username,
            email,
            password
        });
        newUser.save();
        if (newUser) {
            res.status(200).json({ status: "User Created Successfully" });
        } else {
            res.status(401).json({ status: "Some Error Occured!" });
        }
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(401).json(error);
    }
}

module.exports = { getAllUsers, logInUser, signUpUser };