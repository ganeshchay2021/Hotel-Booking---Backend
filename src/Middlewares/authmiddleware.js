import userModel from "../Models/user.model.js";

export async function authMiddleWare(req, res, next) {

    const { userId } = req.auth;

    if (!userId) {
        return res.json({
            succes: false,
            message: "not authorized"
        });
    }

    const user = await userModel.findById(userId);

    if (!user) {
        return res.json({
            succes: false,
            message: "user not found"
        });
    }

    req.user = user;

    next();
}