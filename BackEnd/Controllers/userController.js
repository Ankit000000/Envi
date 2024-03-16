const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // creating a token
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const signupUser = async (req, res) => {
    const { name, email, phone, gender, password} = req.body;

    try {
        const user = await User.signup(name, email, phone, gender, password);

        // creating a token
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser }