import { Router } from "express";
import authRoutes from "../auth/auth.routes";
import userRoutes from "../user/user.routes";
import clientRoutes from "../client/client.routes";
import disciplineRoutes from "../discipline/discipline.routes";

const indexRoutes = Router();

indexRoutes.use("/auth", authRoutes);

indexRoutes.use("/user", userRoutes);

indexRoutes.use("/client", clientRoutes);

//Discipline
indexRoutes.use("/discipline", disciplineRoutes);

export default indexRoutes;
