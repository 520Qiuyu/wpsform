import * as env from "dotenv";
env.config();

export default {
  port: Number(process.env.PORT) || 3000,
  secret: process.env.SECRET || "form",
};
