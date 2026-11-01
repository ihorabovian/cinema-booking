import { graphql } from "@/lib/gql";

export const UPDATE_PROFILE = graphql(`
  mutation UpdateProfile(
    $firstname: String
    $lastname: String
    $middlename: String
    $city: String
    $email: String
  ) {
    updateProfile(
      firstname: $firstname
      lastname: $lastname
      middlename: $middlename
      city: $city
      email: $email
    ) {
      success
      reason
    }
  }
`);
