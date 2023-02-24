import app from "../../src/app";
import supertest from "supertest";  
import {faker} from "@faker-js/faker";
import { cleanDb } from "../helpers";
import { createUser, generateValidToken } from "../factories/user-factories";
import jwt from "jsonwebtoken"
import { createNetwork, generateNetworkBody } from "../factories/network-factories";

const server = supertest(app)

beforeEach(async () => {
    await cleanDb();
});

describe("POST /network", () => {
    it("should respond with 401 if no token is given", async () => {
        const response = await server.post("/network");
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.post("/network").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.post("/network").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });
    describe("when token is valid", () => {
        it("should respond with 400 if body is not sended", async () => {
            const user = await createUser();
            const token = await generateValidToken(user)
            const response = await server.post("/network").set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(400)
        });
        
        it("should respond with 400 if body is invalid", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const invalidBody = {[faker.lorem.word()]: faker.lorem.word()}
            const response = await server.post("/network").set("Authorization", `Bearer ${token}`).send(invalidBody);
            expect(response.status).toBe(400)
        });

        describe("when body is valid", () => {
            it("should respond with 201 and body", async () => {
                const user = await createUser();
                const token = await generateValidToken(user);
                const body = generateNetworkBody();
                
                const response = await server.post("/network").set("Authorization", `Bearer ${token}`).send(body);
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

describe("GET /network/:id", () => {
    it("should respond with 401 if no token is given", async () => {
        const response = await server.get("/network");
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.get("/network").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.get("/network").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    describe("when token is valid", () => {
        it("should respond with 404 if id not exist", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const body = generateNetworkBody()
            const network = await createNetwork(body, user.id)
            const response = await server.get(`/network/${network.id + 1}`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(404)
        })

        it("should respond with 403 if network does not belong to user", async () => {
            const userOwner = await createUser();
            await generateValidToken(userOwner);
            const body = generateNetworkBody();
            const network = await createNetwork(body, userOwner.id)
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.get(`/network/${network.id}`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(403)
        })

        it("should respond with 200 and network body", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const body = generateNetworkBody();
            const network = await createNetwork(body, user.id)

            const response = await server.get(`/network/${network.id}`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    network: expect.any(String),
                    password: expect.any(String),
                    userId: expect.any(Number)
                })
            )
        })

    })

})

describe("GET /network", () => {
    it("should respond with 401 if no token is given", async () => {
        const response = await server.get("/network");
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.get("/network").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.get("/network").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    describe("when token is valid", () => {
        it("should respond with 200 and networks array", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const body = generateNetworkBody();
            const body2 = generateNetworkBody();
            await createNetwork(body, user.id)
            await createNetwork(body2, user.id)

            const response = await server.get("/network").set("Authorization", `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        title: expect.any(String),
                        network: expect.any(String),
                        password: expect.any(String),
                        userId: expect.any(Number)
                    })
                ])
            )
        })

    })

})

describe("DELETE /network/:id", () => {
    it("should respond with 401 if no token is given", async () => {
        const response = await server.delete("/network");
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.delete("/network").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.delete("/network").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)
    });

    describe("when token is valid", () => {
        it("should respond with 404 if id not exist", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.delete(`/network/0`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(404)
        });

        it("should respond with 403 if network does not belong to user", async () => {
            const userOwner = await createUser();
            await generateValidToken(userOwner);
            const body = generateNetworkBody();
            const network = await createNetwork(body, userOwner.id)
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.delete(`/network/${network.id}`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(403)
        })

        it("should respond with 204", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const body = generateNetworkBody();
            const network = await createNetwork(body, user.id)

            const response = await server.delete(`/network/${network.id}`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(204)
        })
    })

})
