import pool from '../../utils/db.js';

const listAllCats = async () => {
    const [rows] = await pool.query('SELECT * FROM wsk_cats');
    return rows;
};

const findCatById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [
        id,
    ]);
    return rows[0];
};

const addCat = async (cat) => {
    const { cat_name, weight, owner, filename, birthdate } = cat;
    const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [
        cat_name,
        weight,
        owner,
        filename,
        birthdate,
    ]);
    return { cat_id: result.insertId };
};

const modifyCat = async (cat, id) => {
    const sql = pool.format('UPDATE wsk_cats SET ? WHERE cat_id = ?', [cat, id]);
    const [result] = await pool.execute(sql);
    return result.affectedRows > 0;
};

const removeCat = async (id) => {
    const [result] = await pool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [
        id,
    ]);
    return result.affectedRows > 0;
};

export { listAllCats, findCatById, addCat, modifyCat, removeCat };
