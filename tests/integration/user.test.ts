import app from "../../src/app";
import supertest from "supertest";  
import {faker} from "@faker-js/faker";
import { createUser, generateValidToken } from "../factories/user-factories";
import { cleanDb } from "../helpers";

const server = supertest(app)

beforeEach(async () => {
    await cleanDb();
});

describe("POST /user/sign-up", () => {
    it("shoud respond with 400 if body is not sended", async () => {
        const response = await server.post("/user/sign-up").send({})
        expect(response.status).toBe(400);
    });

    it("should respond with 400 if email is not provided", async () => {
        const invalidBody = { "password": faker.lorem.word() };
        const response = await server.post("/user/sign-up").send(invalidBody);
        expect(response.status).toBe(400);
    });

    it("should respond with 400 if password is not provided", async () => {
        const invalidBody = { "email": faker.lorem.word() };
        const response = await server.post("/user/sign-up").send(invalidBody);
        expect(response.status).toBe(400);
    });

    it("should respond with 400 if password does not have at least 10 caracters", async () => {
        const invalidBody = {"email": faker.internet.email(),"password": faker.internet.password(5)}
        const response = await server.post("/user/sign-up").send(invalidBody);
        expect(response.status).toBe(400);
    });

    describe("when body is valid", () => {
        it("should respond with 201 and user info", async () => {
            const user = {"email": faker.internet.email(), "password": faker.internet.password(12)};    
            const response = await server.post("/user/sign-up").send(user)
            expect(response.status).toBe(201)
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String)
                })
            )
        })
    })
})

describe("POST /user/sign-in", () => {
    it("should respond with 400 if body is not sended", async () => {
        const response = await server.post("/user/sign-in").send()
        expect(response.status).toBe(400);
    });

    it("should respond with 400 if email is not provided", async () => {
        const invalidBody = { "password": faker.lorem.word() };
        const response = await server.post("/user/sign-in").send(invalidBody);
        expect(response.status).toBe(400);
    });

    it("should respond with 400 if password is not provided", async () => {
        const invalidBody = { "email": faker.lorem.word() };
        const response = await server.post("/user/sign-in").send(invalidBody);
        expect(response.status).toBe(400);
    });

    describe("when body is valid", () => {
        it("should respond with 401 if email is not found", async () => {
            const bodyWithInvalidEmail = {"email": faker.internet.email(), "password": faker.internet.password(10)}
            const response = await server.post("/user/sign-in").send(bodyWithInvalidEmail);
            expect(response.status).toBe(401)
        })

        it("should respond with 401 if there is an email but password is wrong", async () => {
            const user = await createUser();
            const response = await server.post("/user/sign-in").send({"email": user.email, "password": faker.internet.password(10)});
            expect(response.status).toBe(401)
        })

        describe("when credentials are valid", () => {
            it("should respond with status 201", async () => {
                const user = await createUser();
                const response = await server.post("/user/sign-in").send({"email": user.email, "password": user.password});
                expect(response.status).toBe(200)
            })

            it("should respond with token", async () => {
                const user = await createUser();
                const response = await server.post("/user/sign-in").send({"email": user.email, "password": user.password});
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String)
                    })
                )
            })
        })
    })
})