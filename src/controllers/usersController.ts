import dotenv from "dotenv";
import sql from "mssql";
import { Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags } from "tsoa";

import { UserCreateRequest, UserRequest, UserUpdateRequest } from "./../models/user.js";

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

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  /** POST /users */
  @Post()
  @SuccessResponse("201", "Created")
  public async createUser(@Body() body: UserCreateRequest): Promise<{ message: string; user?: UserRequest }> {
    const { username } = body;

    if (!username || username.length < 3) {
      this.setStatus(400);
      return { message: "Username must be at least 3 characters long" };
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool.request().input("username", sql.VarChar(100), username).query("INSERT INTO Users (Username) VALUES (@username)");

    return { message: "User created successfully", user: result.recordset[0] as UserRequest };
  }

  /** DELETE /users/{id} */
  @Delete("{id}")
  public async deleteUser(@Path() id: number): Promise<{ message: string }> {
    if (isNaN(id)) {
      this.setStatus(400);
      return { message: "ID invalid" };
    }

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("userId", sql.Int, id).query(`
      DELETE FROM Users
      OUTPUT DELETED.UserId
      WHERE UserId = @userId;
    `);

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return { message: "User not found" };
    }

    return { message: "User deleted successfully" };
  }

  /** GET /users/{id} */
  @Get("{id}")
  public async getUser(@Path() id: number): Promise<null | UserRequest> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Users WHERE UserId = @id");

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return null;
    }

    return result.recordset[0] as UserRequest;
  }

  @Get()
  public async getUsers(): Promise<UserRequest[]> {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Users");
    return result.recordset as UserRequest[];
  }

  /** PUT /users/{id} */
  @Put("{id}")
  public async updateUser(@Path() id: number, @Body() body: UserUpdateRequest): Promise<{ message: string; user?: UserRequest }> {
    const { username } = body;

    if (!username || username.length < 3) {
      this.setStatus(400);
      return { message: "Username must be at least 3 characters long" };
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("username", sql.VarChar(100), username)
      .query("UPDATE Users SET Username = @username OUTPUT INSERTED.UserId, INSERTED.Username WHERE UserId = @id;");

    if (result.recordset.length === 0) {
      this.setStatus(404);
      return { message: "User not found" };
    }

    return {
      message: "User updated successfully",
      user: result.recordset[0] as UserRequest,
    };
  }
}
