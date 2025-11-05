import { Router } from "express";
import multer from "multer";

import { uploadController } from "../controllers/uploadController";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();

// Upload route manually  without TSOA using asyncHandler to catch errors from here
const storage = multer.memoryStorage();
const uploadSingle = multer({ storage }).single("file");

router.post("/books/:bookId/upload", uploadSingle, asyncHandler(uploadController));

export default router;
