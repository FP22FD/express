import { Request, Response, Router } from "express";

import uploadRoutes from "./uploadRoutes";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send(`Hello from Express + TypeScript! + ${process.env.TEST ?? ""}`);
});

router.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/books", (_req: Request, res: Response) => {
  res.json([]);
});

router.use(uploadRoutes);

export default router;
