import { Genre } from "@prisma/client";

export interface IGenreResponse extends Genre {
  value: number;
}
