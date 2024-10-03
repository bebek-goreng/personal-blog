import request from "supertest";
import { app } from "../app.js";
import { UserTestUtils } from "./user-test-utils.js";

describe('POST /v1/api/auth/login', () => {

    beforeEach(async () => {
        await UserTestUtils.createUser();
    });

    afterEach(async () => {
        await UserTestUtils.deleteUser();
    });


    test('it should login successfully with valid credentials', async () => {
        const response = await request(app)
            .post('/v1/api/auth/login')
            .send({
                email: "test@mail.com",
                password: "test"
            })

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    test('should reject login user with invalid credentials', async () => {
        const response = await request(app)
            .post('/v1/api/auth/login')
            .send({
                email: "testt@mail.com",
                password: "test"
            })

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Invalid credentials");
    });
});

describe('POST /v1/api/auth/register', () => {
    afterAll(async () => {
        await UserTestUtils.deleteUser();
    });

    test('should create a new user', async () => {
        const response = await request(app)
            .post('/v1/api/auth/register')
            .send({
                username: "test",
                email: "test@mail.com",
                password: "test"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toMatchObject({
            id: expect.any(Number),
            email: "test@mail.com",
            username: "test"
        });
    });

    test('should reject register new user', async () => {
        const response = await request(app)
            .post('/v1/api/auth/register')
            .send({
                username: "test",
                email: "test@mail.com",
                password: "test"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message");
    });
});