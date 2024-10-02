import { prisma } from "../config/database.js";
import { Jwt } from "../utils/jwt.js";

export class Auth {
    static async authentication(req, res, next) {
        try {
            const header = req.headers.authorization;

            if (!header) {
                return res.status(401).json({
                    message: "header authorization required"
                });
            }

            const token = header.token.split(" ")[1];

            if (!token) {
                res.status(401).json({
                    message: "token required"
                })
            }

            const decodedToken = Jwt.verifyToken(token);

            if (!decodedToken) {
                res.status(401).json({
                    message: "Invalid token"
                });
            }

            const user = await prisma.user.findFirst({
                where: {
                    email: decodedToken.email
                }
            });

            if (!user) {
                res.status(404).json({
                    message: "User not found"
                });
            }

            req.user = {
                id: user.id,
                username: user.username,
                email: user.email
            }

            next();

        } catch (error) {
            return res.status(500).json({
                message: "Authentication error",
                error: error
            });
        }
    }

    static async authorization(req, res, next) {
        try {
            const user = req.user;

            if (!user || user.role !== "admin") {
                res.status(403).json({
                    message: "You don't have authorization"
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                message: "Authorization error",
                error: error
            });
        }
    }
}