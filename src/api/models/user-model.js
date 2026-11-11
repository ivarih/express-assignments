import promisePool from '../../utils/db.js';
import bcrypt from 'bcryptjs';


const listAllUsers = async () => {
    const [rows] = await promisePool.query(
        'SELECT user_id, name, username, email, role FROM wsk_users'
    );
    return rows;
};


const findUserById = async (id) => {
    const [rows] = await promisePool.execute(
        'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?',
        [id]
    );
    return rows[0];
};


const findUserByUsername = async (username) => {
    const [rows] = await promisePool.execute(
        'SELECT * FROM wsk_users WHERE username = ?',
        [username]
    );
    return rows[0];
};


const addUser = async (user) => {
    const { name, username, email, password, role = 'user' } = user;


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = `
    INSERT INTO wsk_users (name, username, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `;
    const params = [name, username, email, hashedPassword, role];

    const [result] = await promisePool.execute(sql, params);
    return { user_id: result.insertId };
};


const modifyUser = async (user, id) => {
    const { name, username, email, password } = user;


    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `
      UPDATE wsk_users 
      SET name = ?, username = ?, email = ?, password = ? 
      WHERE user_id = ?
    `;
        const [result] = await promisePool.execute(sql, [
            name,
            username,
            email,
            hashedPassword,
            id,
        ]);
        return result;
    }


    const sql = `
    UPDATE wsk_users 
    SET name = ?, username = ?, email = ? 
    WHERE user_id = ?
  `;
    const [result] = await promisePool.execute(sql, [name, username, email, id]);
    return result;
};


const removeUser = async (id) => {
    const [result] = await promisePool.execute(
        'DELETE FROM wsk_users WHERE user_id = ?',
        [id]
    );
    return result;
};

export {
    listAllUsers,
    findUserById,
    findUserByUsername,
    addUser,
    modifyUser,
    removeUser,
};

