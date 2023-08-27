const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../model/users");

exports.welcome = (req, res) => {
    res.send("Welcome to user");
};

exports.addUser = async (req, res) => {
    try {
        const { name, emailId, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const user1 = await User.findOne({ emailId: emailId });
        if (user1) return res.status(401).json({ message: "User already exist" });

        const user = new User({
            emailId: emailId,
            name: name,
            password: hashPassword
        });

        await user.save();
        res.status(201).json({ message: "User registered Successfully!" });
    }
    catch (err) {
        console.log(err);
        res.status(402).json({ message: "Something went wrong!" });
    }
};


exports.login = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) return res.status(401).json({ message: "User doesn't exist, Please sign up first" });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Wrong Password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        res.status(201).json({ token, message: "Authentication Successfull" });
    }
    catch (err) {
        console.log(err);
        res.status(401).json("Something went wrong!");
    }
};

exports.subscriptionPurchased = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user.userId });
        // console.log(user);

        user.subscription.planName = req.body.planName;
        user.subscription.planPrice = req.body.planPrice;
        user.subscription.billingCycle = req.body.billingCycle;
        user.subscription.planDevice = req.body.planDevice;
        user.subscription.isActive = true;
        user.subscription.createdOn = Date.now();

        await user.save();
        // console.log(user);

        res.status(201).json({ message: "Successfully saved" });
    }
    catch (err) {
        res.status(401).json({ message: "Something went wrong" });
    }
};

exports.cancel = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user.userId });
        if (!user) return res.status(401).json({ message: "No user found" });
        user.subscription.isActive = false;
        user.subscription.cancelledOn = Date.now();

        await user.save();
        // console.log(user);

        res.status(201).json({ message: "Successfully cancelled" });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: "Something went wrong" });
    }
}

exports.getUser = async (req, res) => {
    const user = await User.findById({ _id: req.user.userId });
    if (!user) return res.status(401).json({ message: "No user found" });
    res.status(201).json(user.subscription);
}