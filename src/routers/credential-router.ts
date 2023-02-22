import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { deleteCredential, findAllCredential, findCredential, newCredential } from "../controllers/credential-controller";

const credentialRouter = Router()

credentialRouter
    .all("/*", authenticateToken)
    .post("/", newCredential)
    .get("/:id", findCredential)
    .get("/", findAllCredential)
    .delete("/:id", deleteCredential)

export {credentialRouter};