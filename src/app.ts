import "dotenv/config";
import cors from "cors";
import indexRoutes from "./routes/index.routes";
import express, { Application } from "express";
import morgan from "morgan";
// Swagger imports
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./config/swagger";

// App initializations
export const app: Application = express();

//Swagger Settings
const specs = swaggerJsDoc(options);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// root route
app.get("/", (_req, res) => {
  res.send("Bienvenido al panel de medical dashboard");
});

// More App Routes
app.use("/api", indexRoutes);

// Swagger routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Set App Port
app.set("PORT", process.env.PORT || 3001);

// Swagger Settings
