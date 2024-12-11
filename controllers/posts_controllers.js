const postModel = require("../models/posts_model");

const getAllposts = async (req, res) =>{
    const senderFilter = req.query.sender;
    try{
        if(senderFilter){
            const posts = await postModel.find({sender: senderFilter});
            res.status(200).send(posts);
        }else {
            const posts= await postModel.find();
            res.status(200).send(posts);
        }
    }catch(error){
        res.status(400).send(error.message);
    }
};

const getpostById = async (req,res)=>{
    const postId= req.params.id;
    try{
        const post = await postModel.findById(postId);
            res.status(200).send(post);
    }catch(error){
        res.status(400).send(error);
    }
}
const createPost = async (req,res) =>{
    const post = req.body; 
    try{
        const newPost = await postModel.create(post);
        res.status(201).send(newPost);
    }catch(error){
        res.status(400).send(error);
    }
};
const updatePost = async (req, res) => {
    const postId = req.params.id; 
    const updatedData = req.body; 
    try {
        const updatedPost = await postModel.findByIdAndUpdate(postId, updatedData, { new: true, runValidators: true });
        if (!updatedPost) {
            return res.status(404).send({ message: "Post not found" });
        }

        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(400).send({ message: "Error updating post", error });
    }
};

module.exports = {createPost,getpostById,getAllposts,updatePost};