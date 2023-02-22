import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { deleteNetwork, findNetwork, newNetwork } from "../controllers/network-controller";

const networkRouter = Router();

networkRouter
    .all("/*", authenticateToken)
    .post("/", newNetwork)
    .get("/:id", findNetwork)
    .delete("/:id", deleteNetwork)

export {networkRouter};