const commentModel = require("../models/comments_model");
const postModel = require("../models/posts_model");

const getAllComments = async (req, res) => {
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

const getCommentById = async (req,res)=>{
    const commentId= req.params.id;
    try{
        const comment = await commentModel.findById(commentId);
            res.status(200).send(post);
    }catch(error){
        res.status(400).send(error);
    }

}

const addNewComment = async (req, res) => {
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

const updateComment = async (req, res) => {
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

const deleteComment = async (req, res) => {
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


module.exports = {getAllComments, getCommentById, addNewComment, updateComment, deleteComment};
