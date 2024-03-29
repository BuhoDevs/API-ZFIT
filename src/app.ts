import "dotenv/config"
import { db } from "./db"
import cors from "cors";
import { router } from "./routes";
import express, { Application } from "express"
import morgan from "morgan"


export const app: Application = express();
app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT"]
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use(router);

