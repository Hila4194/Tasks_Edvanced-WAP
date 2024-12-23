import express, {Express} from 'express';
const app = express();
import dotenv from "dotenv";
dotenv.config(); 
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts_routes";
import commentRoutes from "./routes/comments_routes";

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
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use("/posts", postRoutes);
                app.use("/comments", commentRoutes);
                resolve(app);
            })
            .catch((err) => {
                reject(err);
            });
        }
    });
};

export default initApp;