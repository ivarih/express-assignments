import pool from '../../utils/db.js';

const listAllUsers = async () => {
    const [rows] = await pool.query('SELECT user_id, name, username, email, role FROM wsk_users');
    return rows;
};

const findUserById = async (id) => {
    const [rows] = await pool.execute(
        'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?',
        [id]
    );
    return rows[0];
};

const addUser = async (user) => {
    const { name, username, email, password, role } = user;
    const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [name, username, email, password, role || 'user']);
    return { user_id: result.insertId };
};

export { listAllUsers, findUserById, addUser };
