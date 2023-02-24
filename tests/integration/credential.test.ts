import app from "../../src/app";
import supertest from "supertest";  
import {faker} from "@faker-js/faker";
import { cleanDb } from "../helpers";
import { createUser, generateValidToken } from "../factories/user-factories";
import jwt from "jsonwebtoken"
import { createCredential, generateCredentialBody } from "../factories/credential-factories";

const server = supertest(app)

beforeEach(async () => {
    await cleanDb();
});

describe("POST /credential", () => {
    it("should respond with 401 if no token is given", async () => {
        const response = await server.post("/credential");
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.post("/credential").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.post("/credential").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    describe("when token is valid", () => {
        it("should respond with 400 if body is not sended", async () => {
            const user = await createUser();
            const token = await generateValidToken(user)
            const response = await server.post("/credential").set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(400)
        });
        
        it("should respond with 400 if body is invalid", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const invalidBody = {[faker.lorem.word()]: faker.lorem.word()}
            const response = await server.post("/credential").set("Authorization", `Bearer ${token}`).send(invalidBody);

            expect(response.status).toBe(400)
        });

        describe("when body is valid", () => {
            it("should respond with 409 if title is already used by user", async () => {
                const user = await createUser();
                const token = await generateValidToken(user);
                const oldBody = generateCredentialBody();
                await createCredential(oldBody, user.id);
                const newBody = generateCredentialBody();
                newBody.title = oldBody.title;

                const response = await server.post("/credential").set("Authorization", `Bearer ${token}`).send(newBody);
                expect(response.status).toBe(409)
            })
            
            it("should respond with 201 and body", async () => {
                const user = await createUser();
                const token = await generateValidToken(user);
                const body = generateCredentialBody();
                
                const response = await server.post("/credential").set("Authorization", `Bearer ${token}`).send(body);
                expect(response.status).toBe(201)
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        title: expect.any(String)
                    })
                )
            })
            
        })
    })
})

describe("GET /credential/:id", () => {
    it("should respond with 401 if no token is given", async () => {
        const response = await server.get("/credential");
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.get("/credential").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.get("/credential").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    describe("when token is valid", () => {
        it("should respond with 404 if id not exist", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.get(`/credential/0`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(404)
        })

        it("should respond with 403 if credential does not belong to user", async () => {
            const userOwner = await createUser();
            await generateValidToken(userOwner);
            const body = generateCredentialBody();
            const credential = await createCredential(body, userOwner.id)
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.get(`/credential/${credential.id}`).set("Authorization", `Bearer ${token}`)
            console.log(`o status daqui foi ${response.status}`)
            expect(response.status).toBe(403)
        })

        it("should respond with 200 and credential body", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const body = generateCredentialBody();
            const credential = await createCredential(body, user.id)

            const response = await server.get(`/credential/${credential.id}`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    url: expect.any(String),
                    username: expect.any(String),
                    password: expect.any(String),
                    userId: expect.any(Number)
                })
            )   
        })
    })
})

describe("GET /credential", () => {
    it("should respond with 401 if no token is given", async () => {
        const response = await server.get("/credential");
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.get("/credential").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.get("/credential").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    describe("when token is valid", () => {
        it("should respond with 200 and credentials array", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const body = generateCredentialBody();
            const body2 = generateCredentialBody();
            await createCredential(body, user.id)
            await createCredential(body2, user.id)

            const response = await server.get("/credential").set("Authorization", `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        title: expect.any(String),
                        url: expect.any(String),
                        username: expect.any(String),
                        password: expect.any(String),
                        userId: expect.any(Number)
                    })
                ])
            )
        }) 
    })
})

describe("DELETE /credential/:id", () => {
    it("should respond with 401 if no token is given", async () => {
        const response = await server.delete("/credential");
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.delete("/credential").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.delete("/credential").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    describe("when token is valid", () => {
        it("should respond with 404 if id not exist", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.delete(`/credential/0`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(404)
        })

        it("should respond with 403 if credential does not belong to user", async () => {
            const userOwner = await createUser();
            await generateValidToken(userOwner);
            const body = generateCredentialBody();
            const credential = await createCredential(body, userOwner.id)
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.delete(`/credential/${credential.id}`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(403)
        })

        it("should respond with 204", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const body = generateCredentialBody();
            const credential = await createCredential(body, user.id)

            const response = await server.delete(`/credential/${credential.id}`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(204)
        })
    })

})