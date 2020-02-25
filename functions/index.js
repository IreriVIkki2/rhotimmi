const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const next = require("next");
const admin = require("firebase-admin");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const firebase = admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use(cors({ origin: true }));
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(
    session({
        secret: "geheimnis",
        saveUninitialized: true,
        store: new FileStore({ secret: "geheimnis" }),
        resave: false,
        rolling: true,
        cookie: { maxAge: 604800000, httpOnly: true }, // week
    }),
);

main.use((req, res, next) => {
    req.firebaseServer = firebase;
    next();
});

main.use((req, res, next) => {
    req.firebaseServer = firebase;
    next();
});

main.use("/v1", app);

// test the functions
app.get("/", (req, res) => {
    res.send("Hello from Firebase!");
});

app.post("/login", (req, res) => {
    console.log("logging in");
    if (!req.body) return res.sendStatus(400);

    const token = req.body.token;
    firebase
        .auth()
        .verifyIdToken(token)
        .then(decodedToken => {
            req.session.decodedToken = decodedToken;
            return decodedToken;
        })
        .then(decodedToken => res.json({ status: true, decodedToken }))
        .catch(error => res.json({ error }));
});

app.post("/logout", (req, res) => {
    console.log("Logging out");
    req.session.decodedToken = null;
    res.json({ status: true });
});

// Create and api object and export it as an endpoint
const api = functions
    .runWith({ memory: "2GB", timeoutSeconds: 120 })
    .https.onRequest(main);

module.exports = { api };
