import {
    addCat,
    findCatById,
    listAllCats,
    modifyCat,
    removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res, next) => {
    try {
        const cats = await listAllCats();
        res.json(cats);
    } catch (error) {
        next(error);
    }
};

const getCatById = async (req, res, next) => {
    try {
        const cat = await findCatById(req.params.id);
        if (!cat) {
            const error = new Error('Cat not found');
            error.status = 404;
            return next(error);
        }
        res.json(cat);
    } catch (error) {
        next(error);
    }
};

const postCat = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error('Invalid or missing file');
            error.status = 400;
            return next(error);
        }

        const catData = {
            ...req.body,
            owner: req.user.user_id,
            filename: req.file.filename,
        };

        const result = await addCat(catData);
        res.status(201).json({ message: 'New cat added.', ...result });
    } catch (error) {
        next(error);
    }
};

const putCat = async (req, res, next) => {
    try {
        const existingCat = await findCatById(req.params.id);
        if (!existingCat) {
            const error = new Error('Cat not found');
            error.status = 404;
            return next(error);
        }

        if (req.user.role !== 'admin' && existingCat.owner !== req.user.user_id) {
            const error = new Error('Not authorized to modify this cat');
            error.status = 403;
            return next(error);
        }

        const success = await modifyCat(req.body, req.params.id);
        if (success) {
            res.json({ message: 'Cat item updated.' });
        } else {
            const error = new Error('Failed to update cat');
            error.status = 400;
            return next(error);
        }
    } catch (error) {
        next(error);
    }
};

const deleteCat = async (req, res, next) => {
    try {
        const existingCat = await findCatById(req.params.id);
        if (!existingCat) {
            const error = new Error('Cat not found');
            error.status = 404;
            return next(error);
        }

        if (req.user.role !== 'admin' && existingCat.owner !== req.user.user_id) {
            const error = new Error('Not authorized to delete this cat');
            error.status = 403;
            return next(error);
        }

        const success = await removeCat(req.params.id);
        if (success) {
            res.json({ message: 'Cat item deleted.' });
        } else {
            const error = new Error('Failed to delete cat');
            error.status = 400;
            return next(error);
        }
    } catch (error) {
        next(error);
    }
};

export { getCat, getCatById, postCat, putCat, deleteCat };
