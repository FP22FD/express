import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import serverless from "serverless-http";

dotenv.config();

export const app = express();
export const router = Router();

// Middleware to accept JSON
app.use(express.json());

app.use("/api", router);

// -----------------Utilities for controllers---------------------

export function errorHandler(err: Error, req: Request, res: Response, next: express.NextFunction) {
  if (res.headersSent) {
    next(err);
    return;
  }

  const msg = err.message || "Internal Server Error";
  res.json(msg);
}

export function wrapAsync(fn: (req: Request, res: Response, next: express.NextFunction) => Promise<void>) {
  return function (req: Request, res: Response, next: express.NextFunction) {
    fn(req, res, next).catch(next);
  };
}

// -------------------Local development server---------------------

if (process.env.ENV === "local") {
  const PORT = process.env.PORT ?? "3000";

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

app.use(errorHandler);

// ---------------------Serverless export-------------------------

export const handler = serverless(app);

//---------------------Test endpoint and mount event---------------

router.get("/", (_req, res) => {
  res.send(`Hello from Express + TypeScript! + ${process.env.TEST ?? ""}`);
});

router.get("/hello", (_req, res) => {
  res.send("Hello World!");
});
