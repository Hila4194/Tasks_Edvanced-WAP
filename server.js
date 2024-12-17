const express = require('express');
const app = express();
const dotenv = require("dotenv").config(); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts_routes");
const commentRoutes = require("./routes/comments_routes");

const db = mongoose.connection;
db.on("error", (error)=> console.error(error));
db.once("open", ()=> console.log("Connected to Database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", postRoutes);

app.use("/comments", commentRoutes);

const initApp = async () => {
    return new Promise(async (resolve, reject) => {
        await mongoose.connect(process.env.DB_CONNECTION);
        resolve(app);
        });
};

module.exports = initApp;