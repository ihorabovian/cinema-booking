import { graphql } from "@/lib/gql";

// The token isn't in the body (the API returns null there): it comes as a
// session_token cookie in the response headers.
export const SIGN_IN = graphql(`
  mutation SignIn($phone: String!, $code: Float!) {
    signIn(phone: $phone, code: $code) {
      success
      reason
    }
  }
`);
