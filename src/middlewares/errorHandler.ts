import express, { Request, Response } from "express";

//Global middleware that catches errors and sends a 500 response
export function errorHandler(err: Error, _req: Request, res: Response, next: express.NextFunction) {
  if (res.headersSent) {
    next(err);
    return;
  }
  console.error("Global error:", err);
  res.status(500).json({ error: err.message || "Internal error", success: false });
}
