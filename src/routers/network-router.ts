import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { deleteNetwork, findAllNetwork, findNetwork, newNetwork } from "../controllers/network-controller";

const networkRouter = Router();

networkRouter
    .all("/*", authenticateToken)
    .post("/", newNetwork)
    .get("/:id", findNetwork)
    .get("/", findAllNetwork)
    .delete("/:id", deleteNetwork)

export {networkRouter};