const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//const login = require('./backend/login');

const app = express();


app.listen(3000, () => {
    console.log("Server started with port 3000");
});