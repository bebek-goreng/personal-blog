import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Jwt {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.SECRET_KEY);
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.SECRET_KEY)
    }
}