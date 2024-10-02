import bcrypt from "bcrypt";

export class Bcrypt {
    static async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

