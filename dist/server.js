import express from "express";
var app = express();
app
    .use("/health", function (req, res) { return res.send("Tudo jóia no drivenpass!"); });
var port = 4000;
app.listen(port, function () { return console.log("Server running in port:", port); });
