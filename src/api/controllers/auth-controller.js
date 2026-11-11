import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { findUserByUsername } from '../models/user-model.js';

const postLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'Bad username or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Bad username or password' });
        }

        const userPayload = {
            user_id: user.user_id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        res.json({
            message: 'Logged in successfully',
            token,
            user: userPayload,
        });
    } catch (err) {
        next(err);
    }
};

const getMe = async (req, res) => {
    res.json({
        message: 'Token is valid',
        user: req.user,
    });
};

export { postLogin, getMe };