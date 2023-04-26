import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import productRouter from './routes/productRoute.js';
import dbConfig from './config/dbConfig.js';

const app = express();
const dotEnv = dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/product', productRouter);
app.use('/auth', authRoute);

const PORT = '3333';
app.listen(PORT, () => console.log(`Server Running at Port: ${PORT}`));
