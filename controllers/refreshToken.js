import userModels from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await userModels.findOne({ refresh_token : refreshToken });
        if (!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = user._id;
            const first_name = user.first_name;
            const last_name = user.last_name;
            const username = user.username;
            const role = user.role;
            const email = user.email;
            const accessToken = jwt.sign({ userId, first_name, last_name, username, role, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}