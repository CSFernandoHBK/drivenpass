import app from "../../src/app";
import supertest from "supertest";  
import {faker} from "@faker-js/faker";
import { createUser } from "../factories/user-factories";

const server = supertest(app)

describe("POST /user/sign-up", () => {
    it("shoud respond with 400 if body is not sended", async () => {
        const response = await server.post("/user/sign-up").send()
        console.log(response.status)
        expect(response.status).toBe(400);
    });

    it("should respond with 400 if email is not provided", async () => {
        const invalidBody = { "password": faker.lorem.word() };
        const response = await server.post("/users/sign-up").send(invalidBody);
        expect(response.status).toBe(400);
    });

    it("should respond with 400 if password is not provided", async () => {
        const invalidBody = { "email": faker.lorem.word() };
        const response = await server.post("/users/sign-up").send(invalidBody);
        expect(response.status).toBe(400);
    });

    it("should respond with 400 if password does not have at least 10 caracters", async () => {
        const invalidBody = {"email": faker.internet.email(),"password": faker.internet.password(5)}
        const response = await server.post("/users/sign-up").send(invalidBody);
        expect(response.status).toBe(400);
    });

    describe("when body is valid", () => {
        it("should respond with 201 and user info", async () => {
            const user = createUser();
            const response = await server.post("/users/sign-up").send(user) 
            console.log(response.body)
            expect(response.status).toBe(201)
        })
    })
})