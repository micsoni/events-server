const express = require("express");
const eventRouter = require("./event/router");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4002;

// cors middleWare
const corsMiddleware = cors();
app.use(corsMiddleware);

//bodyparser muddleWare
const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.use(eventRouter);

app.get("/", (req, res) => res.send("Welcome to the homepage!"));
app.listen(port, console.log(`listening on port ${port}`));
