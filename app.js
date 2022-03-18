require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const apiRouter = require("./routes/api.routes");

const app = express();

const port = process.env.port || 5000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

//routes
app.use('/user', userRouter);
app.use('/tmdb', apiRouter);

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});