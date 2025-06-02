import express from "express";
import serverless from "serverless-http";

const app = express();
const router = express.Router();

router.get("/hello", (_req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

// Export the handler to be used in Netlify
export const handler = serverless(app);
