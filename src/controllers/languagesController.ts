import dotenv from "dotenv";
import sql from "mssql";
import { Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags } from "tsoa";

import { CreateLanguageRequest, LanguageRequest, UpdateLanguageRequest } from "./../models/language.js";

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

@Route("languages")
@Tags("Languages")
export class LanguagesController extends Controller {
  /** POST /languages */
  @Post()
  @SuccessResponse("201", "Created")
  public async createLanguage(@Body() body: CreateLanguageRequest): Promise<{ message: string }> {
    const { languageCode } = body;

    if (!languageCode || languageCode.length !== 2) {
      this.setStatus(400);
      return { message: "LanguageCode must be exactly 2 characters" };
    }

    const pool = await sql.connect(sqlConfig);

    await pool.request().input("languageCode", sql.VarChar(2), languageCode).query("INSERT INTO Languages (LanguageCode) VALUES (@languageCode)");

    return { message: "Language created successfully" };
  }

  /** DELETE /languages/{id} */
  @Delete("{id}")
  public async deleteLanguage(@Path() id: number): Promise<{ message: string }> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("languageId", sql.Int, id).query(`
      DELETE FROM Languages
      OUTPUT DELETED.LanguageId
      WHERE LanguageId = @languageId;
    `);

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return { message: "Language not found" };
    }

    return { message: "Language deleted successfully" };
  }

  /** GET /languages/{id} */
  @Get("{id}")
  public async getLanguage(@Path() id: number): Promise<LanguageRequest | null> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Languages WHERE LanguageId = @id");

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return null;
    }

    return result.recordset[0] as LanguageRequest;
  }

  /** GET /languages */
  @Get()
  public async getLanguages(): Promise<LanguageRequest[]> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Languages");
    return result.recordset as LanguageRequest[];
  }

  /** PUT /languages/{id} */
  @Put("{id}")
  public async updateLanguage(@Path() id: number, @Body() body: UpdateLanguageRequest): Promise<{ message: string }> {
    const { languageCode } = body;

    if (!languageCode || languageCode.length !== 2) {
      this.setStatus(400); // invalid data request
      return { message: "LanguageCode must be exactly 2 characters" };
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("languageCode", sql.VarChar(2), languageCode)
      .query("UPDATE Languages SET LanguageCode = @languageCode WHERE LanguageId = @id");

    if (result.rowsAffected[0] === 0) {
      this.setStatus(404); // not found
      return { message: "Language not found" };
    }

    return { message: "Language updated successfully" };
  }
}
