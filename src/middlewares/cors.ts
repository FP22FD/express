import cors from "cors";

export const corsHandler = cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
});
