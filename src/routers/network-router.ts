import { Router } from "express";
import { deleteNetwork, findNetwork, newNetwork } from "../controllers/network-controller";

const networkRouter = Router();

networkRouter
    .post("/", newNetwork)
    .get("/", findNetwork)
    .delete("/", deleteNetwork)

export default networkRouter;