import commentModel, { IComment } from "../models/comments_model";
import { Request, Response } from "express";
import Basecontroller from "./base_controllers";

const commentController = new Basecontroller<IComment>(commentModel);

export default commentController;