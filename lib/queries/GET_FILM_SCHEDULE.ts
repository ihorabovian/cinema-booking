import { graphql } from "@/lib/gql";

export const GET_FILM_SCHEDULE = graphql(`
  query GetFilmSchedule($filmId: String!) {
    getFilmSchedule(filmId: $filmId) {
      success
      reason
      schedules {
        date
        seances {
          time
          hall {
            name
          }
        }
      }
    }
  }
`);
