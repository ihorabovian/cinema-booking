export type AgeRating = "pg" | "pg13" | "r";
export type Profession = "actor" | "director";

export type Person = {
  id: string;
  professions: Profession[];
  fullName: string;
  photo: string;
};

export type Country = {
  id: number;
  name: string;
  code: string;
  code2: string;
};

export type Film = {
  _id: string;
  id: string;
  name: string;
  originalName: string;
  description: string;
  releaseDate: string;
  actors: Person[];
  directors: Person[];
  runtime: number;
  ageRating: AgeRating;
  genres: string[];
  userRatings: { kinopoisk: string; imdb: string };
  img: string;
  country: Country;
};

export type FilmsResponse = {
  success: boolean;
  films: Film[];
};
