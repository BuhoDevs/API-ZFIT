// import { Router } from "express"
import { userClientRoutes } from "./users/userClient.routes";
//// import { adminRoutes } from "./admin.routes";

// export const router = Router()

//// router.use(adminRoutes)
//rutas estructuradas

router.use("userClient", userClientRoutes)

export default router;