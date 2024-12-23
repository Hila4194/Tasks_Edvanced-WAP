import express, {Request,Response} from "express";
import post from "../controllers/posts_controllers";

const router = express.Router();

router.get("/", (res: Request, req: Response) => {
    post.getAll(res,req);
});

router.get("/:id", (res: Request, req: Response) => {
    post.getById(res,req);
});

router.post("/", (res: Request, req: Response) => {
    post.createItem(res,req);
});
router.put("/:id", (res: Request, req: Response) => {
    post.updateItem(res,req);
});
router.delete("/:id", (res: Request, req: Response) => {
    post.deleteItem(res,req);
});

export default router;