import postModel, { IPost } from "../models/posts_model";
import { Request, Response } from "express";
import createController from "./base_controllers";

const postController = createController<IPost>(postModel);

export default postController;