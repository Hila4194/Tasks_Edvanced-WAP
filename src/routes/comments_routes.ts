import express, {Request,Response} from "express";
import commentController from "../controllers/comments_controllers";
import { authMiddleware } from "../controllers/auth_controllers";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The Comments API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - comment
 *         - author
 *         - postId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         comment:
 *           type: string
 *           description: The content of the comment
 *         author:
 *           type: string
 *           description: The author id of the comment
 *         postId:
 *           type: string
 *           description: The id of the post the comment belongs to
 *       example:
 *         _id: 5f8d0d55b54764421b7156c1
 *         content: This is a comment.
 *         author: 5f8d0d55b54764421b7156c2
 *         postId: 5f8d0d55b54764421b7156c3
 */

router.get("/", commentController.getAll.bind(commentController));

router.get("/:id", (res: Request, req: Response) => {
    commentController.getById(res,req);
});

router.post("/", authMiddleware, commentController.createItem.bind(commentController));

router.put("/:id",authMiddleware, (res: Request, req: Response) => {
    commentController.updateItem(res,req);
});

router.delete("/:id", authMiddleware, (res: Request, req: Response) => {
    commentController.deleteItem(res,req);
});

export default router;