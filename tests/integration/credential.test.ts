import app from "../../src/app";
import supertest from "supertest";  
import {faker} from "@faker-js/faker";
import { cleanDb } from "../helpers";

const server = supertest(app)

beforeEach(async () => {
    await cleanDb();
});

describe("POST /credential", () => {
    it("testing the test", async () => {
        expect(2+2).toBe(4)
    });

    /*it("", async () => {
        
    });

    it("", async () => {
        
    });

    describe("when token is valid", () => {
        it("", async () => {
        
        }); 
    })*/
})