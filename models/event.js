// const pool = require('../config/database');

// class Event {
//     static async getAll() {
//         const [rows, fields] = await pool.query('SELECT * FROM events');
//         return rows;
//     }

//     // Autres méthodes pour manipuler les événements (ajout, mise à jour, suppression) peuvent être ajoutées ici
// }

// module.exports = Event;
const pool = require('../config/database');

class Event {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM events');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
        return rows[0];
    }

    static async create({ name, description, location, start_date, end_date }) {
        const sql = 'INSERT INTO events (name, description, location, start_date, end_date) VALUES (?, ?, ?, ?, ?)';
        await pool.query(sql, [name, description, location, start_date, end_date]);
    }

    static async update({ id, name, description, location, start_date, end_date }) {
        const sql = 'UPDATE events SET name = ?, description = ?, location = ?, start_date = ?, end_date = ? WHERE id = ?';
        await pool.query(sql, [name, description, location, start_date, end_date, id]);
    }

    static async delete(id) {
        const sql = 'DELETE FROM events WHERE id = ?';
        await pool.query(sql, [id]);
    }
}

module.exports = Event;
