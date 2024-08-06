// const pool = require('../config/database');

// class Event {
//     static async getAll() {
//         const [rows, fields] = await pool.query('SELECT * FROM events');
//         return rows;
//     }

//     // Autres méthodes pour manipuler les événements (ajout, mise à jour, suppression) peuvent être ajoutées ici
// }

// module.exports = Event;
// const pool = require('../config/database');

// class Event {
//     static async getAll() {
//         const [rows] = await pool.query('SELECT * FROM events');
//         return rows;
//     }

//     static async getById(id) {
//         const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
//         return rows[0];
//     }

//     static async create({ name, description, location, start_date, end_date }) {
//         const sql = 'INSERT INTO events (name, description, location, start_date, end_date) VALUES (?, ?, ?, ?, ?)';
//         await pool.query(sql, [name, description, location, start_date, end_date]);
//     }

//     static async update({ id, name, description, location, start_date, end_date }) {
//         const sql = 'UPDATE events SET name = ?, description = ?, location = ?, start_date = ?, end_date = ? WHERE id = ?';
//         await pool.query(sql, [name, description, location, start_date, end_date, id]);
//     }

//     static async delete(id) {
//         const sql = 'DELETE FROM events WHERE id = ?';
//         await pool.query(sql, [id]);
//     }
// }

// module.exports = Event;
// models/eventModel.js
// class EventModel {
//     constructor(apiUrl) {
//       this.apiUrl = apiUrl;
//     }
  
//     async getAllEvents() {
//       const response = await fetch(this.apiUrl);
//       return response.json();
//     }
  
//     async getEventById(id) {
//       const response = await fetch(`${this.apiUrl}/${id}`);
//       return response.json();
//     }
  
//     async createEvent(eventData) {
//       const response = await fetch(this.apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(eventData),
//       });
//       return response.json();
//     }
  
//     async updateEvent(id, eventData) {
//       const response = await fetch(`${this.apiUrl}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(eventData),
//       });
//       return response.json();
//     }
  
//     async deleteEvent(id) {
//       const response = await fetch(`${this.apiUrl}/${id}`, {
//         method: 'DELETE',
//       });
//       return response.ok;
//     }
//   }
  
// models/eventModel.js
// const db = require('../config/database');

// class EventModel {
//   static getAllEvents(callback) {
//     db.query('SELECT * FROM Evenements', (err, results) => {
//       if (err) throw err;
//       callback(results);
//     });
//   }

//   static getEventById(id, callback) {
//     db.query('SELECT * FROM Evenements WHERE id = ?', [id], (err, results) => {
//       if (err) throw err;
//       callback(results[0]);
//     });
//   }

//   static createEvent(eventData, callback) {
//     db.query('INSERT INTO Evenements SET ?', eventData, (err, results) => {
//       if (err) throw err;
//       callback(results.insertId);
//     });
//   }

//   static updateEvent(id, eventData, callback) {
//     db.query('UPDATE Evenements SET ? WHERE id = ?', [eventData, id], (err, results) => {
//       if (err) throw err;
//       callback(results.affectedRows);
//     });
//   }

//   static deleteEvent(id, callback) {
//     db.query('DELETE FROM Evenements WHERE id = ?', [id], (err, results) => {
//       if (err) throw err;
//       callback(results.affectedRows);
//     });
//   }
// }

// module.exports = EventModel;
const pool = require("../config/database");

class Event {
  static async getAllEvents() {
    try {
      const [rows] = await pool.query("SELECT * FROM Evenements");
      return rows;
    } catch (err) {
      throw new Error("An error occurred while fetching events.");
    }
  }

  static async getEventById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM Evenements WHERE id = ?", [
        id,
      ]);
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error("Event not found.");
      }
    } catch (err) {
      throw new Error("An error occurred while fetching the event.");
    }
  }

  static async addEvent(
    titre,
    apercu,
    description,
    image_url,
    date_debut,
    date_fin,
    time,
    lieu,
    plan,
    observations,
    participation,
    info_add
  ) {
    try {
      await pool.query(
        "INSERT INTO Evenements (titre, apercu, description, image_url, date_debut, date_fin, time, lieu, plan, observations, participation, info_add) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          titre,
          apercu,
          description,
          image_url,
          date_debut,
          date_fin,
          time,
          lieu,
          plan ? JSON.stringify(plan) : null,
          observations,
          participation,
          info_add,
        ]
      );
    } catch (err) {
      throw new Error("An error occurred while adding the event.");
    }
  }

  static async updateEvent(
    id,
    titre,
    apercu,
    description,
    image_url,
    date_debut,
    date_fin,
    time,
    lieu,
    plan,
    observations,
    participation,
    info_add
  ) {
    try {
      await pool.query(
        "UPDATE Evenements SET titre = ?, apercu = ?, description = ?, image_url = ?, date_debut = ?, date_fin = ?, time = ?, lieu = ?, plan = ?, observations = ?, participation = ?, info_add = ? WHERE id = ?",
        [
          titre,
          apercu,
          description,
          image_url,
          date_debut,
          date_fin,
          time,
          lieu,
          plan ? JSON.stringify(plan) : null,
          observations,
          participation,
          info_add,
          id,
        ]
      );
    } catch (err) {
      throw new Error("An error occurred while updating the event.");
    }
  }

  static async deleteEvent(id) {
    try {
      await pool.query("DELETE FROM Evenements WHERE id = ?", [id]);
    } catch (err) {
      throw new Error("An error occurred while deleting the event.");
    }
  }
}

module.exports = Event;
