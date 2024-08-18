import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://AI-Form-Builder_owner:iwESN4sOVyc7@ep-misty-unit-a1svk92y.ap-southeast-1.aws.neon.tech/AI-Form-Builder?sslmode=require",
  },
});
