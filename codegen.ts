import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

// Codegen runs outside Next.js, so load .env the same way Next does.
loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: `${process.env.API_BASE_URL}/graphql`,
  documents: ["lib/**/*.{ts,tsx}", "!lib/gql/**"],
  ignoreNoDocuments: true,
  generates: {
    "./lib/gql/": {
      preset: "client",
    },
  },
};

export default config;
