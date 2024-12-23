import express, {Request,Response} from "express";
import comment from "../controllers/comments_controllers";

const router = express.Router();

router.get("/", (res: Request, req: Response) => {
    comment.getAll(res,req);
});

router.get("/:id", (res: Request, req: Response) => {
    comment.getById(res,req);
});

router.post("/", (res: Request, req: Response) => {
    comment.createItem(res,req);
});

router.put("/:id", (res: Request, req: Response) => {
    comment.updateItem(res,req);
});

router.delete("/:id", (res: Request, req: Response) => {
    comment.deleteItem(res,req);
});

export default router;