import {
    addCat,
    findCatById,
    listAllCats,
    modifyCat,
    removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
    try {
        const cats = await listAllCats();
        res.json(cats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCatById = async (req, res) => {
    try {
        const cat = await findCatById(req.params.id);
        if (cat) {
            res.json(cat);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postCat = async (req, res) => {
    try {
        const catData = {
            ...req.body,
            owner: req.user.user_id,
            filename: req.file ? req.file.filename : null,
        };
        const result = await addCat(catData);
        res.status(201).json({ message: 'New cat added.', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const putCat = async (req, res) => {
    try {

        const existingCat = await findCatById(req.params.id);
        if (!existingCat) {
            return res.sendStatus(404);
        }

        if (req.user.role !== 'admin' && existingCat.owner !== req.user.user_id) {
            return res.status(403).json({ message: 'Not authorized to modify this cat' });
        }

        const success = await modifyCat(req.body, req.params.id);
        if (success) {
            res.json({ message: 'Cat item updated.' });
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCat = async (req, res) => {
    try {

        const existingCat = await findCatById(req.params.id);
        if (!existingCat) {
            return res.sendStatus(404);
        }

        if (req.user.role !== 'admin' && existingCat.owner !== req.user.user_id) {
            return res.status(403).json({ message: 'Not authorized to delete this cat' });
        }

        const success = await removeCat(req.params.id);
        if (success) {
            res.json({ message: 'Cat item deleted.' });
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getCat, getCatById, postCat, putCat, deleteCat };