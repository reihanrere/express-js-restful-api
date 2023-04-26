import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModels from "../models/userModel.js";

export const Register = async (req, res) => {
    if (req.body.password !== req.body.confirm_password) return res.status(400).json({ code: 400, message: "Password dan Confirm Password tidak cocok" });
    let bcryptPassword = bcrypt.hashSync(req.body.password, 8);
    const userModel = new userModels({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        role: req.body.role,
        email: req.body.email,
        password: bcryptPassword,
        confirm_password: bcryptPassword
    });
    try {
        userModel.save();
        res.status(200).json({ code: 200, message: "Register Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await userModels.findOne({ email: req.body.email });
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ code: 400, message: "Wrong Password" });
        const userId = user._id;
        const role = user.role;
        const email = user.email;
        const accessToken = jwt.sign({ _id: userId, email, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });
        const refreshToken = jwt.sign({ _id : userId, email: email, role: role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await userModels.updateOne({ _id: userId }, {
            $set: { refresh_token: refreshToken }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ code: 200, data: { email, role, accessToken } });
    } catch (error) {
        res.status(404).json({ code: 404, message: "Email tidak ditemukan" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await userModels.findOne({ refresh_token: refreshToken });
    if (!user) return res.sendStatus(204);
    const userId = user._id;
    await userModels.updateOne({ _id: userId }, { $set: { refresh_token: null } });
    res.clearCookie('refreshToken');
    return res.status(200).json({
        code : 200,
        message: "Logout Success!"
    });
}

export const getAllUser = async (req, res) => {
    const user = await userModels.find();
    try {
        const user = await userModels.find();
        res.status(200).json({
            code: 200,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error
        })
    }
}