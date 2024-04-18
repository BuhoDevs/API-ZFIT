import { Request, RequestHandler } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: Function) => {
    cb(null, path.join(__dirname, "../upload"));
  },
  filename: (_req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const singleUploadMiddleware: RequestHandler = upload.single("photo");

export { singleUploadMiddleware };
