const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, 
    {useCreateIndex: true, useFindAndModify: true, useNewUrlParser:true, useUnifiedTopology:true},
    (err, scs) => {
        if(!err) console.log('JoSign connected successfully');
});