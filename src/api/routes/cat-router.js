import express from 'express';
import { authenticateToken } from '../../middlewares.js';
import {
    getCat,
    getCatById,
    postCat,
    putCat,
    deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.route('/')
    .get(getCat)
    .post(authenticateToken, postCat);

catRouter.route('/:id')
    .get(getCatById)
    .put(authenticateToken, putCat)
    .delete(authenticateToken, deleteCat);

export default catRouter;

