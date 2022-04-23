const firebase = require("firebase");

const app = firebase.initializeApp({
    apiKey:"AIzaSyB0l9uLMspRQDxedlPH-AXDl3qwF1X3XW8",
    authDomain:"data-trial-5eee1.firebaseapp.com",
    databaseURL:"https://data-trial-5eee1.firebaseio.com/",
}) 

module.exports = app;