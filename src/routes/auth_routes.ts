import express, {Request,Response} from "express";
import authcontroller from "../controllers/auth_controllers";
// import postcontroller from "../controllers/posts_controllers";

const router = express.Router();

router.post("/register", (res: Request, req: Response) => {
    authcontroller.register(res,req);
});

router.post("/login", (res: Request, req: Response) => {
    authcontroller.login(res,req);
});

export default router;