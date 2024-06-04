import { Router } from "express";
import authRoutes from "../auth/auth.routes";
import userRoutes from "../user/user.routes";
import clientRoutes from "../client/client.routes";
import disciplineRoutes from "../discipline/discipline.routes";
import genreRoutes from "../genre/genre.routes";

import subsTypeRoutes from "../subscriptionType/substype.routes";
import subscriptionRoutes from "../subscrption/subscription.routes";
import checkinRoutes from "../checkin/checkin.routes";

const indexRoutes = Router();

indexRoutes.use("/auth", authRoutes);

indexRoutes.use("/users", userRoutes);

indexRoutes.use("/clients", clientRoutes);

indexRoutes.use("/genres", genreRoutes);

indexRoutes.use("/disciplines", disciplineRoutes);

indexRoutes.use("/subscriptions", subscriptionRoutes);

indexRoutes.use("/substypes", subsTypeRoutes);

indexRoutes.use("/checkin", checkinRoutes);

export default indexRoutes;
