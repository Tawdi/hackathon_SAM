const promisePool = require('../config/db');

async function addSponsors(sponsors, eventId) {
    const sponsorPromises = sponsors.nom.map((nom, index) => {
        return promisePool.query(`
            INSERT INTO Sponsors (nom, description, evenement_id)
            VALUES (?, ?, ?)
        `, [nom, sponsors.description[index], eventId]);
    });

    await Promise.all(sponsorPromises);
}

module.exports = { addSponsors };
