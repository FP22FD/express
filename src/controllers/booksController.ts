import dotenv from "dotenv";
import sql from "mssql";
import { Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags } from "tsoa";

import { BookAuthor, BookAuthorCreateRequest, BookCreateRequest, BookRequest, BookUpdateRequest } from "./../models/book.js";

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

  /** POST /books */ // -- books
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
          (CreatedBy, Description, DownloadUrl, ImageUrl, ISBN, LanguageId, Title, Year)
        OUTPUT INSERTED.BookId
        VALUES
          (@createdBy, @description, @downloadUrl, @imageUrl, @isbn, @languageId, @title, @year)
      `);

    return { id: result.recordset[0].BookId, message: "Book created successfully" };
  }

  /** DELETE /books/{id} */ // -- books
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
  public async getAuthorsByBook(@Path() bookId: number): Promise<BookAuthor[]> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("bookId", sql.Int, bookId).query("SELECT * FROM BooksAuthors WHERE BookId = @bookId");
    return result.recordset as BookAuthor[];
  }

  /** GET /books/{id} */
  @Get("{id}")
  public async getBook(@Path() id: number): Promise<BookRequest | null> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Books WHERE BookId = @id");

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return null;
    }

    return result.recordset[0] as BookRequest;
  }

  /** GET /books */ // -- books
  @Get()
  public async getBooks(): Promise<BookRequest[]> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Books");
    return result.recordset;
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
