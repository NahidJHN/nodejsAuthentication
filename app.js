//import Dependencies 
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/authRoute");
const session = require("express-session");
const flash = require("connect-flash");
const localAccess = require("./middlewares/localMiddleware");
const bindUser = require("./middlewares/bindUser");
const mongoStore = require("connect-mongodb-session")(session);
//Database Uir
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.wdhdb.mongodb.net/userDB?retryWrites=true&w=majority`;

// const MONGO_URI = "mongodb://127.0.0.1:27017/userDB";
const store = new mongoStore({
    uri: MONGO_URI,
    collection: "session",
    expires: 1000 * 60 * 60 * 24 * 30,
});
// setup middlewares and view engine
const app = express();
app.set("view engine", "ejs");

// middlewares

const middleares = [
    express.static("public"),
    express.urlencoded({ extended: true }),
    express.json(),
    //session setup
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
        },
        store,
    }),

    flash(),
    bindUser,

    localAccess,
    router,
];

app.use(middleares);
//404 error handaller
app.use((req, res, next) => {
    let error = new Error("404 page not found");
    error.status = 404;
    next(error);
});

//error hendeler middleware
app.use((error, req, res, next) => {
    if (error.status === 404) {
        return res.render("error/404");
    }
    console.log(error);
});

const PORT = process.env.PORT || 8080;
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connect Successful");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((e) => {
        console.log("Database connection failed");
        console.log(e);
    });
