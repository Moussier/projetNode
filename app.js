const http = require('http')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Coursnodedb');

const blockRoutes = require('./api/routes/blockRoutes');
const userRoutes = require('./api/routes/userRoutes');
const txRoutes = require('./api/routes/txRoutes');
const utilRoutes = require('./api/routes/utilRoutes');
blockRoutes(app);
userRoutes(app);
txRoutes(app);
utilRoutes(app);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname);
