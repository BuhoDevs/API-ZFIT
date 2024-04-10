import { findAllGenres } from "./genre.service";
import { Request, Response } from "express";

export const allGenresController = async (_req: Request, res: Response) => {
  try {
    const genres = await findAllGenres();
    return res.json(genres);
  } catch (error) {
    return res.json({
      error,
      message: "Error interno del servidor",
    });
  }
};
