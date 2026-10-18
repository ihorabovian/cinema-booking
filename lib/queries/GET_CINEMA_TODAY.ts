import { graphql } from "@/lib/gql";

export const GET_CINEMA_TODAY = graphql(`
  query GetCinemaToday {
    getCinemaToday {
      success
      reason
      films {
        id
        name
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
