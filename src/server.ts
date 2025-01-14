import express, {Express, NextFunction,Request,Response} from 'express';
const app = express();
import dotenv from "dotenv";
dotenv.config(); 
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts_routes";
import commentRoutes from "./routes/comments_routes";
import authRoutes from "./routes/auth_routes";
import fileRouter from "./routes/file_routes";

const delay = (req:Request, res:Response, next:NextFunction) => {
    const d = new Promise<void>((r) => setTimeout(() => r(), 2000));
    d.then(() => next());
    next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
    await new Promise<void>((r) => setTimeout(() => r(), 1000));
});
app.use("/posts",delay, postRoutes);
app.use("/comments",delay, commentRoutes);
app.use("/auth",delay, authRoutes);
app.use("/file", fileRouter);
app.use("/public", express.static("public"));
app.use(express.static("front"));



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