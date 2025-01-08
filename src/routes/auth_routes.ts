import express, {Request,Response} from "express";
import authcontroller from "../controllers/auth_controllers";
// import postcontroller from "../controllers/posts_controllers";

const router = express.Router();

router.post("/register", authcontroller.register);

router.post("/login", authcontroller.login);

router.post("/logout", authcontroller.logout);

router.post("/refresh", authcontroller.refresh);

export default router;