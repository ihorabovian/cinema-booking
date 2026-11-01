import { graphql } from "@/lib/gql";

export const GET_CINEMA_ORDERS = graphql(`
  query GetCinemaOrders {
    getCinemaOrders {
      success
      reason
      orders {
        _id
        orderNumber
        status
        film {
          id
          name
        }
        tickets {
          _id
          row
          column
          seance {
            date
            time
          }
        }
      }
    }
  }
`);
