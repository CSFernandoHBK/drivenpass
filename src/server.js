import express from "express";

const app = express()

app
    .use("/health", (req, res) => res.send("Tudo jóia no drivenpass!"))

const port = 4000;
app.listen(port, () => console.log("Server running in port:", port))