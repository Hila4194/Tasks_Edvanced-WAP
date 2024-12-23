import express, {Request,Response} from "express";
import comment from "../controllers/comments_controllers";

const router = express.Router();

router.get("/", (res: Request, req: Response) => {
    comment.getAllComments(res,req);
});

router.get("/:id", (res: Request, req: Response) => {
    comment.getCommentById(res,req);
});

router.post("/", (res: Request, req: Response) => {
    comment.addNewComment(res,req);
});

router.put("/:id", (res: Request, req: Response) => {
    comment.updateComment(res,req);
});

router.delete("/:id", (res: Request, req: Response) => {
    comment.deleteComment(res,req);
});

export default router;