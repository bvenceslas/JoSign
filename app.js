require('./db/dbConnect');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 4001;

app.use('/api', require('./routes/api'));

app.listen(port, () => console.log(`Listening on port: ${port} ......`));