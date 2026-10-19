import { GraphQLClient } from "graphql-request";

export const gqlClient = new GraphQLClient(
  `${process.env.API_BASE_URL}/graphql`,
);
