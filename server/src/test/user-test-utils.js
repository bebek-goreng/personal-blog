import { prisma } from "../config/database.js";
import { Bcrypt } from "../utils/bcrypt.js";

export class UserTestUtils {
    static async createUser() {
        const hashPassword = await Bcrypt.hashPassword("test")
        const user = await prisma.user.create({
            data: {
                username: "test",
                email: "test@mail.com",
                password: hashPassword
            }
        });

        return user;
    }

    static async deleteUser() {
        const deletedUser = await prisma.user.deleteMany({
            where: {
                username: "test"
            }
        });

        return deletedUser;
    }
}