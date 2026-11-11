import express from 'express';
import { body } from 'express-validator';
import {
    getCat,
    getCatById,
    postCat,
    putCat,
    deleteCat,
} from '../controllers/cat-controller.js';
import { authenticateToken } from '../../middlewares.js';
import { upload } from '../../middlewares/upload.js';
import { validationErrors } from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

catRouter
    .route('/')
    .get(getCat)
    .post(
        authenticateToken,
        upload.single('file'),
        body('cat_name')
            .trim()
            .isLength({ min: 3, max: 50 })
            .withMessage('cat_name must be between 3 and 50 characters'),
        body('weight')
            .isFloat({ min: 0.1, max: 30 })
            .withMessage('weight must be a valid positive number'),
        body('birthdate')
            .isISO8601()
            .toDate()
            .withMessage('birthdate must be a valid date (YYYY-MM-DD)'),
        validationErrors,
        postCat
    );

catRouter
    .route('/:id')
    .get(getCatById)
    .put(authenticateToken, putCat)
    .delete(authenticateToken, deleteCat);

export default catRouter;
