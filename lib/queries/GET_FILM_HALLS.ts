import { graphql } from "@/lib/gql";

export const GET_FILM_HALLS = graphql(`
  query GetFilmHalls($filmId: String!) {
    getFilmSchedule(filmId: $filmId) {
      success
      reason
      schedules {
        date
        seances {
          time
          hall {
            name
            places {
              price
              type
            }
          }
        }
      }
    }
  }
`);
