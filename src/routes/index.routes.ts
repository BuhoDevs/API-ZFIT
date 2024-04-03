import { Router } from "express";
import authRoutes from "../auth/auth.routes";

const indexRoutes = Router();

indexRoutes.use("/auth", authRoutes);

export default indexRoutes;
