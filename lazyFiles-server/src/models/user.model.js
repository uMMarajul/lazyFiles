const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        profilePicture: { type: String },
        provider: { type: String, enum:['google'] },
        googleId: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
