import express, { Request, Response } from "express";

const app = express()

app
    .use("/health", (req: Request, res: Response) => res.send("Tudo jóia no drivenpass!"))

const port = 4000;
app.listen(port, () => console.log("Server running in port:", port))