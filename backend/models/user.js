const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    cellphone: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}))

module.exports = User