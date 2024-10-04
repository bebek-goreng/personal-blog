import { UserServices } from "../services/user-service.js";

export class UserControllers {
    static async login(req, res, next) {
        try {
            const data = req.body;
            const user = await UserServices.login(data);

            res.status(200).json({
                message: "ok",
                token: user
            })
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const data = req.body;
            const newUser = await UserServices.register(data);

            res.status(200).json({
                message: "ok",
                data: newUser
            })
        } catch (error) {
            next(error)
        }
    }
}