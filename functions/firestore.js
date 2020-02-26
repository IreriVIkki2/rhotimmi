// import config from "../config/config";
const firebase = require("firebase/app");
const functions = require("firebase-functions");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
const myAdmin = require("firebase-admin");
const clientCredentials = require("./credentials/client");

let db, storage, admin;

try {
    firebase.initializeApp(clientCredentials);
    db = firebase.firestore();
    storage = firebase.storage();
    admin = myAdmin.initializeApp(functions.config().firebase);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error", err.stack);
    }
}

module.exports = { db, firebase, storage, admin };
