const mongoose = require('mongoose');

const Project = mongoose.Schema({
    title: {type: String, required: [true, 'title can\'t be empty']},
    description: {type: String, required: [true, 'description can\'t be empty']},
    associated: {type: String},
    location: {type: String},
    amount: {type: Number, default: 0}    
});

module.exports = mongoose.model('projects', Project);
