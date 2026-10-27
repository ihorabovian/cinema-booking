import { graphql } from "@/lib/gql";

export const CREATE_CINEMA_PAYMENT = graphql(`
  mutation CreateCinemaPayment($input: CreateCinemaPaymentDto!) {
    createCinemaPayment(input: $input) {
      success
      reason
      order {
        orderNumber
      }
    }
  }
`);
