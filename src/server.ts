import express, { Request, Response } from "express";
import {credentialRouter} from "./routers/credential-router";
import { userRouter } from "./routers/user-router";
import cors from "cors"

const app = express()

app
    .use(cors())
    .use(express.json())
    .use("/health", (req: Request, res: Response) => res.send("Tudo jóia no drivenpass!"))
    .use("/user", userRouter)
    .use("/credential", credentialRouter)

const port = 4000;
app.listen(port, () => console.log("Server running in port:", port))