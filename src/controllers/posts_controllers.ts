import postModel from "../models/posts_model";
import { Request, Response } from "express";
import Basecontroller from "./base_controllers";

const postController = new Basecontroller(postModel);

export default postController;