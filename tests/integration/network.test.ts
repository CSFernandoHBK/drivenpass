import app from "../../src/app";
import supertest from "supertest";  
import {faker} from "@faker-js/faker";

const server = supertest(app)

describe("POST /credential", () => {

    it("should respond with 401 if no token is given", async () => {
        
    });

    it("should respond with status 401 if given token is not valid", async () => {
        
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        
    });

    describe("when token is valid", () => {
        it("", async () => {
        
        }); 
    })
})

describe("GET /network/:id", () => {
    
})
