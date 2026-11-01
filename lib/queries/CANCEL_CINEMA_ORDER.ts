import { graphql } from "@/lib/gql";

export const CANCEL_CINEMA_ORDER = graphql(`
  mutation CancelCinemaOrder($orderId: String!) {
    cancelCinemaOrder(input: { orderId: $orderId }) {
      success
      reason
    }
  }
`);
