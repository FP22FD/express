import camelcaseKeys from "camelcase-keys";
import dotenv from "dotenv";
import sql from "mssql";
import { Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags, UploadedFile } from "tsoa";

import { getSignedDownloadUrl, uploadBufferToAzure } from "../services/azureBlobService.js";
import { BookAuthorCreateRequest, BookAuthorResponse, BookCreateRequest, BookResponse, BookUpdateRequest } from "./../models/book.js";

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

@Route("books")
@Tags("Books")
export class BooksController extends Controller {
  /** POST /books/{bookId}/authors */
  @Post("{bookId}/authors")
  @SuccessResponse("201", "Created")
  public async addAuthorToBook(@Path() bookId: number, @Body() body: BookAuthorCreateRequest): Promise<{ message: string }> {
    const { authorId } = body;

    if (!authorId) {
      this.setStatus(400);
      return { message: "authorId is required" };
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("bookId", sql.Int, bookId)
      .input("authorId", sql.Int, authorId)
      .query("SELECT * FROM BooksAuthors WHERE BookId = @bookId AND AuthorId = @authorId");

    if (result.recordset.length > 0) {
      this.setStatus(400);
      return { message: "Author is already linked to this book" };
    }

    await pool
      .request()
      .input("bookId", sql.Int, bookId)
      .input("authorId", sql.Int, authorId)
      .query("INSERT INTO BooksAuthors (BookId, AuthorId) VALUES (@bookId, @authorId)");

    return { message: "Author added to book successfully" };
  }

  // router.post("/books/:bookId/upload", uploadSingle, asyncHandler(uploadController));
  @Post("{bookId}/upload")
  @SuccessResponse("201", "Created")
  public async addImageToBook(@Path() bookId: number, @UploadedFile() file: Express.Multer.File): Promise<undefined | { message: string }> {
    try {
      if (!bookId) {
        this.setStatus(400);
        return { message: "Missing bookId" };
      }

      const { blobName } = await uploadBufferToAzure(file.buffer, file.originalname, file.mimetype);

      const pool = await sql.connect(sqlConfig);

      await pool.request().input("bookId", sql.Int, bookId).input("imageUrl", sql.NVarChar(500), blobName).query(`
            UPDATE Books
            SET ImageUrl = @imageUrl
            WHERE BookId = @bookId;
          `);

      this.setStatus(200);
    } catch (err) {
      console.error("uploadController error:", err);
      this.setStatus(500);
      return { message: "Upload failed" };
    }
  }

  /** POST /books */
  @Post()
  @SuccessResponse("201", "Created")
  public async createBook(@Body() body: BookCreateRequest): Promise<{ id: number; message: string }> {
    const { description, downloadUrl, imageUrl, isbn, languageId, title, year } = body;

    if (!title || !languageId || !year || !isbn) {
      this.setStatus(400);
      return { id: 0, message: "Required fields missing or invalid" };
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("description", sql.NVarChar(1000), description)
      .input("downloadUrl", sql.NVarChar(500), downloadUrl ?? "")
      .input("imageUrl", sql.NVarChar(500), imageUrl ?? "")
      .input("isbn", sql.NVarChar(20), isbn)
      .input("languageId", sql.Int, languageId)
      .input("title", sql.NVarChar(200), title)
      .input("year", sql.Int, year).query<{ BookId: number }>(`
        INSERT INTO Books
          (Description, DownloadUrl, ImageUrl, ISBN, LanguageId, Title, Year)
        OUTPUT INSERTED.BookId
        VALUES
          ( @description, @downloadUrl, @imageUrl, @isbn, @languageId, @title, @year)
      `);

    return { id: result.recordset[0].BookId, message: "Book created successfully" };
  }

  /** DELETE /books/{id} */
  @Delete("{id}")
  public async deleteBook(@Path() id: number): Promise<{ message: string }> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("bookId", sql.Int, id).query(`
      DELETE FROM Books
      OUTPUT DELETED.BookId
      WHERE BookId = @bookId;
    `);

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return { message: "Book not found" };
    }

    return { message: "Book deleted successfully" };
  }

  /** GET /books/{bookId}/authors */
  @Get("{bookId}/authors")
  public async getAuthorsByBook(@Path() bookId: number): Promise<BookAuthorResponse[]> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("bookId", sql.Int, bookId).query("SELECT * FROM BooksAuthors WHERE BookId = @bookId");
    return camelcaseKeys(result.recordset, { deep: true }) as unknown as BookAuthorResponse[];
  }

  /** GET /books/{id} */
  @Get("{id}")
  public async getBook(@Path() id: number): Promise<BookResponse | null> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Books WHERE BookId = @id");

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return null;
    }

    const response = camelcaseKeys(result.recordset[0], { deep: true }) as BookResponse;
    response.imageUrl = response.imageUrl ? getSignedDownloadUrl(response.imageUrl) : "";
    return response;
  }

  /** GET /books */
  @Get()
  public async getBooks(): Promise<BookResponse[]> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Books");
    console.log("Books query result:", result.recordset);

    let response = camelcaseKeys(result.recordset, { deep: true }) as unknown as BookResponse[];
    response = response.map((book) => {
      const url = book.imageUrl ? getSignedDownloadUrl(book.imageUrl) : "";

      return { ...book, imageUrl: url };
    });
    return response;
  }

  /** DELETE /books/{bookId}/authors/{authorId} */
  @Delete("{bookId}/authors/{authorId}")
  public async removeAuthorFromBook(@Path() bookId: number, @Path() authorId: number): Promise<{ message: string }> {
    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("bookId", sql.Int, bookId)
      .input("authorId", sql.Int, authorId)
      .query("SELECT * FROM BooksAuthors WHERE BookId = @bookId AND AuthorId = @authorId");

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return { message: "Author not linked to this book" };
    }

    await pool
      .request()
      .input("bookId", sql.Int, bookId)
      .input("authorId", sql.Int, authorId)
      .query("DELETE FROM BooksAuthors WHERE BookId = @bookId AND AuthorId = @authorId");

    return { message: "Author removed from book successfully" };
  }

  /** PUT /books/{id} */ // -- books
  @Put("{id}")
  public async updateBook(@Path() id: number, @Body() body: BookUpdateRequest): Promise<{ id: number; message: string }> {
    const { description, downloadUrl, imageUrl, isbn, languageId, title, year } = body;
    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("bookId", sql.Int, id)
      .input("description", sql.NVarChar(1000), description)
      .input("downloadUrl", sql.NVarChar(500), downloadUrl ?? "")
      .input("imageUrl", sql.NVarChar(500), imageUrl ?? "")
      .input("isbn", sql.NVarChar(20), isbn)
      .input("languageId", sql.Int, languageId)
      .input("title", sql.NVarChar(200), title)
      .input("year", sql.Int, year).query<{ BookId: number }>(`
        UPDATE Books
        SET
            Description = @description,
            DownloadUrl = @downloadUrl,
            ImageUrl = @imageUrl,
            ISBN = @isbn,
            LanguageId = @languageId,
            Title = @title,
            Year = @year
        WHERE BookId = @bookId;
      `);

    if (result.rowsAffected[0] === 0) {
      this.setStatus(404);
      return { id: 0, message: "Book not found" };
    }

    return { id, message: "Book updated successfully" };
  }
}
