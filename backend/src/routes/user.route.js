import { Router } from "express";
import { loginUser,registerUser , addToHistory, getUserHistory } from "../controlllers/user.controller.js";

const userRouter = Router();

userRouter.post('/login', loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/add_to_activity", addToHistory);
userRouter.get("/get_all_activity", getUserHistory);

export default userRouter;