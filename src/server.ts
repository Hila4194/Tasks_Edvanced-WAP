import express, {Express} from 'express';
const app = express();
import dotenv from "dotenv";
dotenv.config(); 
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts_routes";
import commentRoutes from "./routes/comments_routes";
import authRoutes from "./routes/auth_routes";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/auth", authRoutes);

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Web Dev 2025 REST API",
            version: "1.0.0",
            description: "REST server including authentication using JWT",
        },
        servers: [{url: "http://localhost:3000",},],
    },
    apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const initApp = async () => {
    return new Promise<Express>(async (resolve, reject) => {
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", function() {
            console.log("Connected to the database");
        });
        if(!process.env.DB_CONNECTION){
            reject("DB_CONNECTION is not defined");
        } else {
            mongoose.connect(process.env.DB_CONNECTION).then(() => {
                resolve(app);
            })
            .catch((err) => {
                reject(err);
            });
        }
    });
};

export default initApp;