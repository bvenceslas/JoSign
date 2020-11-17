const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Listening on port: ${port} ......`));