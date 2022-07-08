import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SCERET_KEY = process.env.JWT_SCERET_KEY;
// Sign Up
export const signup = async (req, res) => {
    let results = null;
    let errors = null;
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName)) {
        results = null;
        errors = { message: 'Name is required' };
        return res.status(402).json({ results, errors });
    }
    const name = `${firstName} ${lastName}`;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            results = null;
            errors = { message: 'User Aleardy Exist' };
            return res.status(400).json({ results, errors });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, password : hashedPassword, email });
        await newUser.save();
        const token = Jwt.sign({ email: newUser.email, id: newUser._id }, JWT_SCERET_KEY, { expiresIn: '1h' });
        results = newUser;
        errors = null; 
        res.status(200).json({ results, errors, token });
    } catch (error) {
        results = null;
        errors = error;
        res.status(500).json({ results, errors });
    }
}
// Sign In
export const signin = async (req, res) => {
    let results = null;
    let errors = null;
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            results = null;
            errors = { message: 'User does not exist' };
            return res.status(404).json({ results, errors });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            results = null;
            errors = { message: 'Invalid Credentials' };
            return res.status(400).json({ results, errors });
        }
        const token = Jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SCERET_KEY, { expiresIn: '1h' });
        results = existingUser;
        errors = null; 
        res.status(200).json({ results, errors, token });

    } catch (error) {
        results = null;
        errors = error;
        res.status(500).json({ results, errors });
    }
}