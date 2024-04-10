import { Router } from "express";
import authRoutes from "../auth/auth.routes";
import userRoutes from "../user/user.routes";
import clientRoutes from "../client/client.routes";
import genreRoutes from "../genre/genre.routes";

const indexRoutes = Router();

indexRoutes.use("/auth", authRoutes);

indexRoutes.use("/users", userRoutes);

indexRoutes.use("/clients", clientRoutes);

indexRoutes.use("/genres", genreRoutes);

export default indexRoutes;
