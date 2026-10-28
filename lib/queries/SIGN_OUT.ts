import { graphql } from "@/lib/gql";

export const SIGN_OUT = graphql(`
  mutation SignOut {
    signOut {
      success
      reason
    }
  }
`);
