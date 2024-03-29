import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes";

// initialization
const PORT = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// root route
app.get("/", (_req, res) => {
  res.send("Bienvenido al panel de medical dashboard");
});

app.use("/api", indexRoutes);

// server up
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
