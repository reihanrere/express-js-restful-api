import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import productRouter from './routes/productRoute.js';
import dbConfig from './config/dbConfig.js';

const app = express();

// mongoose.connect('mongodb://localhost:27017/restful_db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// const dotEnv = dotenv.config();
// const db = mongoose.connection;
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log("Database Connected"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/product', productRouter);
app.use('/auth', authRoute);

app.listen('3000', () => console.log("Server Running at Port: 3000"));
