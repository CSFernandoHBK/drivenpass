import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { deleteCredential, findCredential, newCredential } from "../controllers/credential-controller";

const credentialRouter = Router()

credentialRouter
    .all("/*", authenticateToken)
    .post("/", newCredential)
    .get("/", findCredential)
    .delete("/", deleteCredential)

export {credentialRouter};