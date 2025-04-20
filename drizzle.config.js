import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: 'postgresql://AI-Content-generator_owner:bpTvQASG2r6q@ep-little-snow-a5qcooma-pooler.us-east-2.aws.neon.tech/ai_mock_interview?sslmode=require'
  },
  out: "./drizzle",
});
