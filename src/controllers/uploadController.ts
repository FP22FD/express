import dotenv from "dotenv";
import { Request, Response } from "express";
import sql from "mssql";

import { uploadBufferToAzure } from "../services/azureBlobService";

dotenv.config();

const sqlConfig = {
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
  password: process.env.DB_PWD,
  pool: {
    idleTimeoutMillis: 30000,
    max: 10,
    min: 0,
  },
  server: process.env.DB_SERVER ?? "",
  user: process.env.DB_USER,
};

export async function uploadController(req: Request, res: Response) {
  try {
    const { bookId } = req.params;
    const file = req.file;

    if (!bookId) return res.status(400).json({ error: "Missing bookId" });
    if (!file) return res.status(400).json({ error: "No file provided" });

    const { blobName, url } = await uploadBufferToAzure(file.buffer, file.originalname, file.mimetype);

    const pool = await sql.connect(sqlConfig);

    await pool.request().input("bookId", sql.Int, bookId).input("imageUrl", sql.NVarChar(500), blobName).query(`
        UPDATE Books
        SET ImageUrl = @imageUrl
        WHERE BookId = @bookId;
      `);

    return res.status(200).json({
      blobName: blobName,
      imageUrl: url,
      message: "Image uploaded and linked successfully!",
    });
  } catch (err) {
    console.error("uploadController error:", err);
    return res.status(500).json({ error: "Upload failed", success: false });
  }
}
