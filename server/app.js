import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import apiRouter from './routes/api';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const env = process.env.NODE_ENV || 'development';
const publicPath = env === 'development' ? '../public' : '../build';
app.use(express.static(path.join(__dirname, publicPath)));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRouter);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, publicPath, 'index.html'));
});
module.exports = app;
