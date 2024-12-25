import commentModel, { IComment } from "../models/comments_model";
import { Request, Response } from "express";
import createController from "./base_controllers";

const commentController = createController<IComment>(commentModel);

export default commentController;