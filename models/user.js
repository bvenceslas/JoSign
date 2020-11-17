const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {type: String, required: [true, 'name can\'t be empty']},
    email: {type: String, required: [true, 'email can\'t be empty']},
    phone: {type: String, required: [true, 'phone can\'t be empty']},
    password: {type: String, required: [true, 'password can\'t be empty']}    
});

module.exports = mongoose.model('users', User);
