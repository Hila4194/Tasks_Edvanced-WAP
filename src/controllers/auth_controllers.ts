import { Request, Response, NextFunction } from "express";
import userModel from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            email: email,
            password: hashedPassword,
        });
        return res.status(200).send(user);
    }catch(err){
        return res.status(400).send(err);
    }
};

const login = async (req: Request, res: Response) => {
    try{
        const email = req.body.email;
        const user = await userModel.findOne({email: email});
        if(!user){
            return res.status(400).send("Wrong Email or password");
        }
        const password = req.body.password;
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).send("Wrong Email or password");
        }
        if(!process.env.TOKEN_SECRET){
            return res.status(400).send("Missing auth configuration");
        }
        const token = await jwt.sign(
            {_id: user._id},
            process.env.TOKEN_SECRET,
            {expiresIn: process.env.TOKEN_EXPIRATION});
        return res.status(200).send({
            email: user.email,
            _id: user._id,
            token: token,
        });
    }catch(err){
        return res.status(400).send(err);
    }};

    type TokenPayLoad = {
        _id: string;
    }
    export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            res.status(401).send("Unauthorized");
            return;
        }
        if(!process.env.TOKEN_SECRET){
            res.status(400).send("Missing auth configuration");
            return;
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if(err){
                res.status(403).send("Invalid token");
                return;
            }
            const payload = data as TokenPayLoad;
            req.query.userId = payload._id;
            next();
        });
    };

export default { register, login };