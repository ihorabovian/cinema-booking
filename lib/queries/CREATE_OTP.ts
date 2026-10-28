import { graphql } from "@/lib/gql";

export const CREATE_OTP = graphql(`
  mutation CreateOtp($phone: String!) {
    createOtp(phone: $phone) {
      success
      reason
      retryDelay
    }
  }
`);
