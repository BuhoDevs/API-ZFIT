import { Router } from "express";
import { registerUser } from './auh.service';

const authRoutes = Router()


authRoutes.use("/", registerUser)

export default authRoutes