require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const apiRouter = require("./routes/api.routes");

const app = express();

const port = process.env.port || 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get("/", (req, res) => {
    res.send("Hello World");
});

//routes
app.use('/user', userRouter);
app.use('/tmdb', apiRouter);

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});