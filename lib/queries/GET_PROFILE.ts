import { graphql } from "@/lib/gql";

export const GET_PROFILE = graphql(`
  query GetProfile {
    getProfile {
      success
      reason
      user {
        phone
        firstname
        lastname
        middlename
        city
        email
      }
    }
  }
`);
