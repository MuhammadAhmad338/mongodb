const User = require("../models/userSchema");
const jsonwebtoken = require("jsonwebtoken");

const logInUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }, (err, user) => {
        if (err) {
            res.status(401).json("Some error Occured!");
        } else if (!user) {
            res.status(401).json("UnAuthenticated!");
        } else if (user.password === password) {
            const token = jsonwebtoken.sign({ userId: user._id }, "secret", { expiresIn: 1440 });

            // Set the `Authorization` header on the response
            res.setHeader("Authorization", `Bearer ${token}`);
        } else {
            res.status(401).json("Invalid Password!");
        }
    });
}

const signUpUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = User.findOne({ email });
    user.then((error) => {
        if (error) {
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
    });
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