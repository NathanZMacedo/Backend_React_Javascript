import { Router } from "express";
import UserController from "../controllers/UserController.js";

const userRouter = Router()
userRouter.get('/register', UserController.RegisterUser)
userRouter.put('/login', UserController.loginUser)

export default userRouter;