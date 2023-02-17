import { Router } from "express";
import { deleteCredential, findCredential, newCredential } from "../controllers/credential-controller";

const credentialRouter = Router()

credentialRouter
    .post("/", newCredential)
    .get("/", findCredential)
    .delete("/", deleteCredential)

export {credentialRouter};