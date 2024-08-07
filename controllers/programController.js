const Program = require('../models/Program');

exports.addProgram = async (req, res) => {
    const { day, description, eventId } = req.body;

    try {
        await Program.createProgram({ day, description, eventId });
        res.redirect(`/event/${eventId}`); // Redirect to the event page to display programs
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add program', error });
    }
};

exports.getProgramsByEventId = async (req, res) => {
    const { eventId } = req.params;

    try {
        const programs = await Program.getProgramsByEventId(eventId);
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch programs', error });
    }
};
