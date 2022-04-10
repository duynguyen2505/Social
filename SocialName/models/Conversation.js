const mongoose = require("mongoose")

const ConvesationSchema = new mongoose.Schema({
    members: {
        type: Array,
    }


}, { timestamps: true });

module.exports = mongoose.model("Convesation", ConvesationSchema)