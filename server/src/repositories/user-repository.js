import { prisma } from "../config/database.js";
import { Bcrypt } from "../utils/bcrypt.js";

export class UserRepositories {
    static async login(data) {
        const { email } = data;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return user;
    }

    static async register(data) {
        const { username, email, password } = data;

        const hashPassword = await Bcrypt.hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashPassword
            }
        });

        return newUser;
    }

    static async updateUser(data) {
        const { id, username, email, password } = data;

        const userUpdate = await prisma.user.update({
            where: {
                id: id
            }, data: {
                username: username,
                email: email,
                password: password
            }
        });

        return userUpdate;
    }
}