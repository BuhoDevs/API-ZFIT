import { prisma } from "../db";
import { IGenreResponse } from "./types";

export const findAllGenres = async (): Promise<IGenreResponse[]> => {
  return (
    await prisma.genre.findMany({
      where: {
        status: true,
      },
    })
  ).map((genre) => ({
    ...genre,
    value: genre.id,
  }));
};
