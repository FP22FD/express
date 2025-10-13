import camelcaseKeys from "camelcase-keys";
import dotenv from "dotenv";
import sql from "mssql";
import { Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags } from "tsoa";

import { BookAuthorResponse } from "../models/book.js";
import { AuthorCreateRequest, AuthorResponse, AuthorUpdateRequest } from "./../models/author.js";

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

@Route("authors")
@Tags("Authors")
export class AuthorsController extends Controller {
  /** POST /authors */
  @Post()
  @SuccessResponse("201", "Created")
  public async createAuthor(@Body() body: AuthorCreateRequest): Promise<{ id: number; message: string }> {
    const { middlename, name, surname } = body;

    if (!name || name.trim() === "") {
      this.setStatus(400);
      return { id: 0, message: "Name is required" };
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), name)
      .input("Middlename", sql.NVarChar(100), middlename)
      .input("Surname", sql.NVarChar(100), surname)
      .input("CreatedBy", sql.Int, 1)
      .input("CreatedAtUtc", sql.DateTimeOffset, new Date().toISOString())
      .input("ModifiedBy", sql.Int, 1)
      .input("ModifiedAtUtc", sql.DateTimeOffset, new Date().toISOString()).query<{ AuthorId: number }>(`
        INSERT INTO Authors 
          (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc)
        OUTPUT INSERTED.AuthorId
        VALUES 
          (@Name, @Middlename, @Surname, @CreatedBy, @CreatedAtUtc, @ModifiedBy, @ModifiedAtUtc)
      `);

    return { id: result.recordset[0].AuthorId, message: "Author created successfully" };
  }

  /** DELETE /authors/{id} */
  @Delete("{id}")
  public async deleteAuthor(@Path() id: number): Promise<{ id: number; message: string }> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("DELETE FROM Authors WHERE AuthorId = @id;");

    if (result.rowsAffected[0] === 0) {
      this.setStatus(404);
      return { id, message: "Author not found" };
    }

    return { id, message: "Author deleted successfully" };
  }

  /** GET /Authors/{id} */
  @Get("{id}")
  public async getAuthor(@Path() id: number): Promise<AuthorResponse | null> {
    const pool = await sql.connect(sqlConfig);
    // const pool = await getSqlPool();
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Authors WHERE AuthorId = @id");

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return null;
    }

    // return result.recordset[0] as AuthorRequest;
    return camelcaseKeys(result.recordset[0], { deep: true }) as unknown as AuthorResponse;
  }

  /** GET /authors */
  @Get()
  public async getAuthors(): Promise<AuthorResponse[]> {
    const pool = await sql.connect(sqlConfig);
    // const pool = await getSqlPool();
    const result = await pool.request().query("SELECT * FROM Authors");
    // return result.recordset as AuthorRequest[];

    return camelcaseKeys(result.recordset, { deep: true }) as unknown as AuthorResponse[];
  }

  /** GET /authors/{authorId}/books */
  @Get("{authorId}/books")
  public async getBooksByAuthor(@Path() authorId: number): Promise<BookAuthorResponse[]> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("authorId", sql.Int, authorId).query("SELECT * FROM BooksAuthors WHERE AuthorId = @authorId");
    // return result.recordset as BookAuthor[];

    return camelcaseKeys(result.recordset, { deep: true }) as unknown as BookAuthorResponse[];
  }

  /** PUT /Authors/{id} */
  @Put("{id}")
  public async updateAuthor(@Path() id: number, @Body() body: AuthorUpdateRequest): Promise<{ id: number; message: string }> {
    const { middlename, name, surname } = body;

    if (!name || name.trim() === "") {
      this.setStatus(400);
      return { id, message: "Name is required" };
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("Name", sql.NVarChar(100), name)
      .input("Middlename", sql.NVarChar(100), middlename)
      .input("Surname", sql.NVarChar(100), surname).query<{ AuthorId: number }>(`
        UPDATE Authors
        SET Name = @Name, Middlename = @Middlename, Surname = @Surname
        OUTPUT INSERTED.AuthorId
        WHERE AuthorId = @id
      `);

    if (result.rowsAffected[0] === 0 || result.recordset.length === 0) {
      this.setStatus(404);
      return { id, message: "Author not found" };
    }

    return { id: result.recordset[0].AuthorId, message: "Author updated successfully" };
  }
}
