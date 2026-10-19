import { graphql } from "@/lib/gql";

export const GET_FILM = graphql(`
  query GetFilm($filmId: String!) {
    getFilm(filmId: $filmId) {
      success
      reason
      film {
        id
        name
        description
        genres
        img
        userRatings {
          kinopoisk
        }
        actors {
          id
          fullName
          photo
        }
      }
    }
  }
`);
