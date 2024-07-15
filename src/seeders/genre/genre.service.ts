import { prisma } from "../../db";
import { genreCollection } from "./contants";

export const insertGenreSeeders = async () => {
  return await prisma.genre.createMany({
    data: genreCollection,
    skipDuplicates: true,
  });
};
