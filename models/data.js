const mongoose = require('mongoose');

const arduinoData = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
    },
    { collection: "arduinoData", timestamps: true }
);

arduinoData.index({ unique: false });

module.exports = mongoose.model("arduData", arduinoData);