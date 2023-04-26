import express from "express";
import { Register, Login, Logout, getAllUser } from "../controllers/authController.js";
import authConfig from '../middleware/authConfig.js';
import { refreshToken } from "../controllers/refreshToken.js";
import user from '../models/userModel.js';

const authRoute = express.Router();

authRoute.get('/', authConfig ,getAllUser);
authRoute.post('/register', Register);
authRoute.post('/login', Login);
authRoute.get('/token', refreshToken);
authRoute.delete('/logout', Logout);


export default authRoute