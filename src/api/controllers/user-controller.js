import { addUser, findUserById, listAllUsers } from '../models/user-model.js';

const getUsers = async (req, res) => {
    try {
        const users = await listAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await findUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postUser = async (req, res) => {
    try {
        const result = await addUser(req.body);
        res.status(201).json({ message: 'New user added.', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const putUser = (req, res) => {
    res.json({ message: 'User item updated.' });
};

const deleteUser = (req, res) => {
    res.json({ message: 'User item deleted.' });
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
