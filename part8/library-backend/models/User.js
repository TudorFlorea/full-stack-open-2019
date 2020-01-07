const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 2,
        required: true,
        unique: true
    },
    favoriteGenre: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);