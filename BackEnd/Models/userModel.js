// Importing necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address'
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isMobilePhone,
            message: 'Invalid phone number'
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    password: {
        type: String,
        required: true
    }
});

// Static method for user signup
userSchema.statics.signup = async function (name, email, phone, gender, password) {
    if (!name || !email || !phone || !gender || !password) {
        throw new Error('All fields must be filled');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await this.create({ name, email, phone, gender, password: hashedPassword });
    return user;
};

// Static method for user login
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // Find the user by email
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Incorrect email');
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Incorrect password');
    }

    return user;
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
