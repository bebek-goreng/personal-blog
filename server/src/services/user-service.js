import { UserRepositories } from "../repositories/user-repository.js";
import { Jwt } from "../utils/jwt.js";

export class UserServices {
    static async login(data) {
        const user = await UserRepositories.login(data.email);

        if (!user) {
            throw { status: 401, message: "Invalid credentials" }
        }

        const comparePassword = await Bcrypt.comparePassword(data.password, user.password)

        if (!comparePassword) {
            throw { status: 401, message: "Invalid credentials" }
        }

        const token = Jwt.generateToken({
            id: user.id,
            username: user.username,
            email: user.email
        });

        return token;
    }

    static async register(data) {
        const existingUser = await UserRepositories.login(data.email);

        if (existingUser) {
            throw { status: 400, message: "Email already taken" }
        }

        const newUser = await UserRepositories.register(data);

        if (!newUser) {
            throw { status: 400, message: "register failed, internal server error" }
        }

        return newUser;
    }
}