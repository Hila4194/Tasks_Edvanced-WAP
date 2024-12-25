import express, {Request,Response} from "express";
import postcontroller from "../controllers/posts_controllers";
import postController from "../controllers/posts_controllers";

const router = express.Router();

router.get("/", postcontroller.getAll.bind(postcontroller));

router.get("/:id", (res: Request, req: Response) => {
    postcontroller.getById(res,req);
});

router.post("/", postController.createItem.bind(postController));

router.put("/:id", (res: Request, req: Response) => {
    postcontroller.updateItem(res,req);
});
router.delete("/:id", (res: Request, req: Response) => {
    postController.deleteItem(res,req);
});

export default router;