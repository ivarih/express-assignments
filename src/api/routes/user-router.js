import express from 'express';
import { body } from 'express-validator';
import {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
} from '../controllers/user-controller.js';
import { validationErrors } from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter
    .route('/')
    .get(getUsers)
    .post(
        body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 chars'),
        body('username')
            .trim()
            .isLength({ min: 3, max: 20 })
            .isAlphanumeric()
            .withMessage('Username must be 3-20 alphanumeric characters'),
        body('email').trim().isEmail().normalizeEmail().withMessage('Invalid email address'),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
        validationErrors,
        postUser
    );

userRouter
    .route('/:id')
    .get(getUserById)
    .put(putUser)
    .delete(deleteUser);

export default userRouter;
