import camelcaseKeys, { ObjectLike } from "camelcase-keys";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response, Router } from "express";
import serverless from "serverless-http";

dotenv.config();

export const app = express();
export const router = Router();

// 1. Middleware CORS: before all
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // or 5175
  })
);

// 2. Middleware to accept JSON
app.use(express.json());

// 4. Middleware: convert backend response to camelCase (res.json)
const camelcaseResponse = (_req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json;

  res.json = function (data: ObjectLike | ObjectLike[]) {
    const camelData = camelcaseKeys(data, { deep: true });
    return oldJson.call(this, camelData);
  };

  next();
};
app.use(camelcaseResponse);

// 5. Mount the router on /api
app.use("/api", router);

router.get("/", (_req, res) => {
  res.send(`Hello from Express + TypeScript! + ${process.env.TEST ?? ""}`);
});

router.get("/hello", (_req, res) => {
  res.send("Hello World!");
});

// Test this endpoint at http://localhost:3000/api/books to check json response
router.get("/books", (_req: Request, res: Response) => {
  res.json([]);
});

// 6. Error handling middleware
export function errorHandler(err: Error, req: Request, res: Response, next: express.NextFunction) {
  if (res.headersSent) {
    next(err);
    return;
  }

  const msg = err.message || "Internal Server Error";
  res.json(msg);
}

if (process.env.ENV === "local") {
  const PORT = process.env.PORT ?? "3000";

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

app.use(errorHandler);

export const handler = serverless(app);
