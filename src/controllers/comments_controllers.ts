import commentModel from "../models/comments_model";
import postModel from "../models/posts_model";
import { Request, Response } from "express";

const getAllComments = async (req: Request, res: Response) => {
    const postFilter = req.query.postId;
    try {
        if (postFilter) {
            const comments = await commentModel.find({ postId: postFilter });
            res.status(200).send(comments);
        } else {
            const comments = await commentModel.find();
            res.status(200).send(comments);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getCommentById = async (req: Request, res: Response)=>{
    const commentId= req.params.id;
    try{
        const comment = await commentModel.findById(commentId);
            res.status(200).send(comment);
    }catch(error){
        res.status(400).send(error);
    }
}

const addNewComment = async (req: Request, res: Response) => {
    const commentData = req.body;
    try {
        const postExists = await postModel.findById(commentData.postId);
        if (!postExists) {
            return res.status(404).send({ message: "Post does not exist." });
        }
        const newComment = await commentModel.create(commentData);
        res.status(201).send(newComment);
    } catch (error) {
        res.status(400).send({ message: "Error creating comment", error: error.message });
    }
};

const updateComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedComment = await commentModel.findByIdAndUpdate(commentId, updatedData, { new: true, runValidators: true });
        if (!updatedComment) {
            return res.status(404).send({ message: "Comment not found" });
        }
        res.status(200).send(updatedComment);
    } catch (error) {
        res.status(400).send({ message: "Error updating comment", error });
    }
};

const deleteComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    try {
        const deletedComment = await commentModel.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).send({ message: "Comment not found" });
        }
        res.status(200).send({ message: "Comment deleted successfully", deletedComment });
    } catch (error) {
        res.status(400).send({ message: "Error deleting comment", error });
    }
};

export default {getAllComments, getCommentById, addNewComment, updateComment, deleteComment};