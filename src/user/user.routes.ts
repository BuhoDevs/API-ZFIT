import { Router } from "express";
import { Register } from "./user.controllers";

const userRoutes = Router();

userRoutes.post("/register", Register);

export default userRoutes;
