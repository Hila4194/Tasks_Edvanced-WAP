import express, {Request,Response} from "express";
import commentController from "../controllers/comments_controllers";

const router = express.Router();

router.get("/", commentController.getAll.bind(commentController));

router.get("/:id", (res: Request, req: Response) => {
    commentController.getById(res,req);
});

router.post("/", commentController.createItem.bind(commentController));

router.put("/:id", (res: Request, req: Response) => {
    commentController.updateItem(res,req);
});

router.delete("/:id", (res: Request, req: Response) => {
    commentController.deleteItem(res,req);
});

export default router;