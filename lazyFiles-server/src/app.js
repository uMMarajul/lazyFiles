

const express = require('express');
const app = express();
const {UserRouter, FileRouter} = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const cors = require('cors');
const cookieParser = require("cookie-parser");



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', UserRouter);
app.use('/api/files', FileRouter);

app.use(errorHandler);

module.exports = app;