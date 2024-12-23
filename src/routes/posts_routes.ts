import express, {Request,Response} from "express";
import post from "../controllers/posts_controllers";

const router = express.Router();

router.get("/", (res: Request, req: Response) => {
    post.getAllposts(res,req);
});

router.get("/:id", (res: Request, req: Response) => {
    post.getpostById(res,req);
});

router.post("/", (res: Request, req: Response) => {
    post.createPost(res,req);
});
router.put("/:id", (res: Request, req: Response) => {
    post.updatePost(res,req);
});
router.delete("/:id", (res: Request, req: Response) => {
    post.deletePost(res,req);
});

export default router;