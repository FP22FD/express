import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import sql from "mssql";
import serverless from "serverless-http";

dotenv.config();
const app = express();
const router = Router();

const sqlConfig = {
  database: process.env.DB_NAME,

  options: {
    encrypt: true, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
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

// Middleware to accept JSON
app.use(express.json());
app.use("/api", router);

//--------------------------------------------------------------------------
// Routes to handle API requests

// Test endpoint and mount event
router.get("/", (_req, res) => {
  res.send(`Hello from Express + TypeScript! + ${process.env.TEST ?? ""}`);
});

router.get("/hello", (_req, res) => {
  res.send("Hello World!");
});

//--------------------------------------------------------------------------
// Routes to manage programming languages

// | Verb   | Route              | Action                  |
// | ------ | ------------------ | -----------------------|
// | GET    | `/languages`       | List all               | made
// | GET    | `/languages/:id`   | Get a language         | made
// | POST   | `/languages`       | Create new language    | made
// | PUT    | `/languages/:id`   | Update language        | made
// | DELETE | `/languages/:id`   | Delete language        | made

// _req is the request object, but the underscore _ shows that it is not being used.
// res is the response object — used to send the response to the client.
// pool represents the active connection to the database.
// Connects to the SQL Server database using the settings defined in sqlConfig.
// await waits for the connection before continuing.
// Creates a SQL request (.request()) and executes the query "SELECT * FROM Languages".
// The result (result) contains several pieces of information, and what matters is result.recordset.
// res.json(result.recordset); Sends the query result to the client in JSON format.
// recordset is an array of JavaScript objects with the table rows.
// catch (err) { ... } If any error occurs (such as connection failure, query error), it falls here.
// console.error(err) prints the error to the terminal.
// res.status(500).send(...) sends a response with HTTP status 500 (internal server error) and a friendly message.

// Client -> GET /api/languages
//        -> Connects to SQL Server
//        -> Executes SELECT * FROM Languages
//        -> Gets the data
//        -> Sends to the client in JSON

/*
  All comments and endpoint descriptions below are translated to English.
*/

//--------------------------------------------------------------------------
// Routes to handle API requests

// Test endpoint and mount event
router.get("/", (_req, res) => {
  res.send(`Hello from Express + TypeScript! + ${process.env.TEST ?? ""}`);
});

router.get("/hello", (_req, res) => {
  res.send("Hello World!");
});

//--------------------------------------------------------------------------
// Routes to manage programming languages

// | Verb   | Route              | Action                  |
// | ------ | ------------------ | -----------------------|
// | GET    | `/languages`       | List all               |
// | GET    | `/languages/:id`   | Get a language         |
// | POST   | `/languages`       | Create new language    |
// | PUT    | `/languages/:id`   | Update language        |
// | DELETE | `/languages/:id`   | Delete language        |

//---------------------------------------------------------------------------
// GET /languages - All languages

router.get(
  "/languages",
  wrapAsync(async (_req: Request, res: Response) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Languages");
    res.json(result.recordset);
  })
);

//---------------------------------------------------------------------------
// GET /languages/:id - Get language by ID
router.get(
  "/languages/:bookId",
  wrapAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.bookId);

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Languages WHERE LanguageId = @id");

    if (result.recordset.length === 0) {
      res.status(404).send("Language not found");
      return;
    }

    res.json(result.recordset[0]);
  })
);

//---------------------------------------------------------------------------
// POST /languages - create new language
router.post(
  "/languages",
  wrapAsync(async (req: Request, res: Response) => {
    const { languageCode } = req.body as { languageCode?: string };

    if (!languageCode || languageCode.length !== 2) {
      res.status(400).send("LanguageCode must be exactly 2 characters");
      return;
    }

    const pool = await sql.connect(sqlConfig);
    await pool.request().input("languageCode", sql.VarChar(2), languageCode).query("INSERT INTO Languages (LanguageCode) VALUES (@languageCode)");

    res.status(201).send("Language created successfully");
  })
);

//---------------------------------------------------------------------------
// PUT /languages/:id - Update language

interface LanguageRequest {
  languageCode: string;
}
router.put(
  "/languages/:id",
  wrapAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const { languageCode } = req.body as LanguageRequest;

    if (!languageCode || languageCode.length !== 2) {
      res.status(400).send("LanguageCode must be exactly 2 characters");
      return;
    }

    const pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("languageCode", sql.VarChar(2), languageCode)
      .query("UPDATE Languages SET LanguageCode = @languageCode WHERE LanguageId = @id");

    if (result.rowsAffected[0] === 0) {
      res.status(404).send("Language not found");
      return;
    }

    res.send("Language updated successfully");
  })
);

//---------------------------------------------------------------------------
// DELETE /languages/:id - Delete language
router.delete(
  "/languages/:id",
  wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("DELETE FROM Languages WHERE LanguageId = @id");

    if (result.rowsAffected[0] === 0) {
      res.status(404).send("Language not found");
      return;
    }

    res.send("Language deleted successfully");
  })
);

//---------------------------------------------------------------------------

// | Verb   | Route           | Action                    |
// | ------ | -------------- | ------------------------- |
// | GET    | `/authors`     | List all authors          | made
// | GET    | `/authors/:id` | Get author by ID          | made
// | POST   | `/authors`     | Create author             | made
// | PUT    | `/authors/:id` | Edit author               | made
// | DELETE | `/authors/:id` | Delete author             | made

router.get(
  "/authors",
  wrapAsync(async (req: Request, res: Response) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Authors");
    res.json(result.recordset);
  })
);

//---------------------------------------------------------------------------

router.get(
  "/author/:id",
  wrapAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Authors WHERE AuthorId = @id");
    res.json(result.recordset[0]);
  })
);

//---------------------------------------------------------------------------

interface AuthorCreateRequest {
  middlename?: string;
  name: string;
  surname?: string;
}

// Standard for bad request response "error details"
// Remove try catch because express already does it
// For 500 error, no need to return an array of errors, just a generic message
router.post(
  "/authors",
  wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const { middlename, name, surname } = req.body as AuthorCreateRequest;

    if (!name || name.trim() === "") {
      res
        .status(400)
        .type("application/problem+json")
        .json({
          errors: [
            {
              detail: "The 'name' field is required and was not provided.",
              field: "name",
            },
          ],
          title: "Missing required field",
        });
      return;
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
      .input("ModifiedAtUtc", sql.DateTimeOffset, new Date().toISOString()).query<{
      AuthorId: number;
    }>(`
          INSERT INTO Authors 
            (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc)
          OUTPUT INSERTED.AuthorId
          VALUES 
            (@Name, @Middlename, @Surname, @CreatedBy, @CreatedAtUtc, @ModifiedBy, @ModifiedAtUtc)
        `);

    const insertedId: number = result.recordset[0].AuthorId;

    res.status(201).json({
      id: insertedId,
      message: "Author created successfully",
    });
  })
);

//---------------------------------------------------------------------------

interface BookEditRequest {
  middlename?: string;
  name: string;
  surname?: string;
}

// Return id, success message, and the updated author data
router.put(
  "/authors/:id",
  wrapAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { middlename, name, surname } = req.body as BookEditRequest;

    if (!name || name.trim() === "") {
      res.status(400).send("The 'name' field is required.");
      return;
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("Name", sql.NVarChar(100), name)
      .input("Middlename", sql.NVarChar(100), middlename)
      .input("Surname", sql.NVarChar(100), surname).query(`
          UPDATE Authors
          SET
            Name = @Name,
            Middlename = @Middlename,
            Surname = @Surname
          WHERE AuthorId = @id;

          SELECT * FROM Authors WHERE AuthorId = @id;
        `);

    if (result.rowsAffected[0] === 0) {
      res.status(404).send("Author not found.");
      return;
    }

    const insertedId: number = (result.recordset[0] as { AuthorId: number }).AuthorId;

    res.status(201).json({
      id: insertedId,
      message: "Author updated successfully",
    });
  })
);

//---------------------------------------------------------------------------
// Only returns the deleted author's ID and a success message
router.delete(
  "/author/:id",
  wrapAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).send("Invalid id.");
      return;
    }

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query(`
          DELETE FROM Authors WHERE AuthorId = @id;
        `);

    if (result.rowsAffected[0] === 0) {
      res.status(404).send("Author not found.");
      return;
    }

    res.json({ id });
  })
);

//--------------------------in progress-------------------------------------------
// Routes to manage books
// 3. Books

// | Verb   | Route         | Action               |
// | ------ | ------------ | -------------------- |
// | GET    | `/books`     | List books           | made
// | GET    | `/books/:id` | Get book by ID       | made
// | POST   | `/books`     | Create book          | made
// | PUT    | `/books/:id` | Edit book            | made
// | DELETE | `/books/:id` | Delete book          | made

router.get(
  "/books",
  wrapAsync(async (req: Request, res: Response) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Books");
    res.json(result.recordset);
  })
);

router.get(
  "/books/:id",
  wrapAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Books WHERE BookId =@id");
    res.json(result.recordset[0]);
  })
);

//---------------------------------------------------------------------------

interface BookCreateRequest {
  createdBy: number;
  description: string;
  downloadUrl?: string;
  imageUrl?: string;
  isbn: number;
  languageId: string;
  title: string;
  year: number;
}

// Mauro tips:
// Express already has error handling middleware, so you don't need to put try/catch in every router.post or router.get.
// Instead, just use a central middleware to catch errors.  -> made

// Standard for bad request response "error details"
// For 500 error, no need to return an array of errors, just a generic message
router.post(
  "/books",
  wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const { createdBy, description, downloadUrl, imageUrl, isbn, languageId, title, year } = req.body as BookCreateRequest;

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("createdBy", sql.Int, createdBy)
      .input("description", sql.NVarChar(1000), description)
      .input("downloadUrl", sql.NVarChar(500), downloadUrl)
      .input("imageUrl", sql.NVarChar(500), imageUrl)
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

    const insertedId: number = result.recordset[0].BookId;

    res.status(201).json({
      id: insertedId,
      message: "Book created successfully",
    });
  })
);

//---------------------------------------------------------------------------
interface BookUpdateRequest {
  bookId: number;
  createdBy: number;
  description: string;
  downloadUrl?: string;
  imageUrl?: string;
  isbn: number;
  languageId: string;
  title: string;
  year: number;
}

router.put(
  "/books/:id",
  wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const bookId = parseInt(req.params.id, 10);
    const { createdBy, description, downloadUrl, imageUrl, isbn, languageId, title, year } = req.body as BookUpdateRequest;

    if (isNaN(bookId)) {
      res.status(400).send("Invalid book ID.");
      return;
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("bookId", sql.Int, bookId)
      .input("createdBy", sql.Int, createdBy)
      .input("description", sql.NVarChar(1000), description)
      .input("downloadUrl", sql.NVarChar(500), downloadUrl)
      .input("imageUrl", sql.NVarChar(500), imageUrl)
      .input("isbn", sql.NVarChar(20), isbn)
      .input("languageId", sql.Int, languageId)
      .input("title", sql.NVarChar(200), title)
      .input("year", sql.Int, year).query<{ BookId: number }>(`
        UPDATE Books
        SET CreatedBy = @createdBy,
            Description = @description,
            DownloadUrl = @downloadUrl,
            ImageUrl = @imageUrl,
            ISBN = @isbn,
            LanguageId = @languageId,
            Title = @title,
            Year = @year
        WHERE BookId = @bookId;

        SELECT * FROM Books WHERE BookId = @bookId;
      `);

    const insertedId: number = result.recordset[0].BookId;

    res.status(201).json({
      id: insertedId,
      message: "Book updated successfully",
    });
  })
);

//---------------------------------------------------------------------------

router.delete(
  "/books/:id",
  wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const bookId = parseInt(req.params.id, 10);

    if (isNaN(bookId)) {
      res.status(400).send("Invalid book ID.");
      return;
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool.request().input("bookId", sql.Int, bookId).query(`
        DELETE FROM Books
        OUTPUT DELETED.BookId
        WHERE BookId = @bookId;
      `);

    if (result.recordset.length === 0) {
      res.status(404).send("Book not found.");
      return;
    }

    res.status(201).json({
      message: "Book deleted successfully",
    });
  })
);

//---------------------------------------------------------------------------
// Routes to manage book authors
// 4. Book Authors

// | Verb   | Route                         | Action                       |
// | ------ | ---------------------------- | ---------------------------- |
// | GET    | `/books/:bookId/authors`     | List authors of a book       | made
// | GET    | `/authors/:authorId/books`   | List books of an author      | made
// | POST   | `/books/:bookId/authors`     | Add author to book           | made
// | DELETE | `/books/:bookId/authors/:id` | Remove author from book      | made

router.get(
  "/books/:bookId/authors",
  wrapAsync(async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.bookId);

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("bookId", sql.Int, bookId).query("SELECT * FROM BooksAuthors WHERE BookId = @bookId");
    res.json(result.recordset);
  })
);

router.get(
  "/authors/:authorId/books",
  wrapAsync(async (req: Request, res: Response) => {
    const authorId = parseInt(req.params.authorId);

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("authorId", sql.Int, authorId).query("SELECT * FROM BooksAuthors WHERE AuthorId = @authorId");

    res.json(result.recordset);
  })
);

//---------------------------------------------------------------------------

interface BookAuthorCreateRequest {
  authorId: number;
}

router.post(
  "/books/:bookId/authors",
  wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const bookId = parseInt(req.params.bookId);
    const { authorId } = req.body as BookAuthorCreateRequest;

    if (!authorId) {
      res.status(400).json({ message: "authorId is required" });
      return;
    }

    const pool = await sql.connect(sqlConfig);

    // Checks if the relationship already exists
    const exists = await pool
      .request()
      .input("bookId", sql.Int, bookId)
      .input("authorId", sql.Int, authorId)
      .query("SELECT * FROM BooksAuthors WHERE BookId = @bookId AND AuthorId = @authorId");

    if (exists.recordset.length > 0) {
      res.status(409).json({ message: "Author already linked to this book" });
      return;
    }

    // Inserts new relationship
    await pool
      .request()
      .input("bookId", sql.Int, bookId)
      .input("authorId", sql.Int, authorId)
      .query("INSERT INTO BooksAuthors (BookId, AuthorId) VALUES (@bookId, @authorId)");

    res.status(201).json({ message: "Author added to book successfully" });
  })
);
//---------------------------------------------------------------------------

router.delete(
  "/books/:bookId/authors/:id",
  wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const bookId = parseInt(req.params.bookId);
    const authorId = parseInt(req.params.id);

    const pool = await sql.connect(sqlConfig);

    // Checks if the relationship exists
    const exists = await pool
      .request()
      .input("bookId", sql.Int, bookId)
      .input("authorId", sql.Int, authorId)
      .query("SELECT * FROM BooksAuthors WHERE BookId = @bookId AND AuthorId = @authorId");

    if (exists.recordset.length === 0) {
      res.status(404).json({ message: "Author not linked to this book" });
      return;
    }

    // Removes the relationship
    await pool
      .request()
      .input("bookId", sql.Int, bookId)
      .input("authorId", sql.Int, authorId)
      .query("DELETE FROM BooksAuthors WHERE BookId = @bookId AND AuthorId = @authorId");

    res.json({ message: "Author removed from book successfully" });
  })
);

//---------------------------------------------------------------------------
// Routes to manage users
// 5. Users

// | Verb   | Route         | Action                     |
// | -----  | ------------ | -------------------------- |
// | GET    | `/users`     | List all users             | made
// | GET    | `/users/:id` | Get a user                 | made
// | POST   | `/users`     | Create user                | made
// | DELETE | `/users/:id` | Remove user                | made
// Create user

router.get(
  "/users",
  wrapAsync(async (req: Request, res: Response) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  })
);

//---------------------------------------------------------------------------

router.get(
  "/users/:id",
  wrapAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Users WHERE UserId = @id");
    res.json(result.recordset[0] ?? {}); // Returns an empty object if user not found
  })
);

//---------------------------------------------------------------------------

interface UserCreateRequest {
  username: string;
}

router.post(
  "/users",
  wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body as UserCreateRequest;

    if (!username) {
      res.status(400).json({ message: "username, email and password are required" });
      return;
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("INSERT INTO Users (Username) OUTPUT INSERTED.UserId VALUES (@username);");

    res.status(201).json({
      message: "User created successfully",
      user: result.recordset[0] as { UserId: number; Username: string },
    });
  })
);

//-------------------------------------------------------------------------

router.delete(
  "/users/:id",
  wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "ID invalid" });
      return;
    }

    const pool = await sql.connect(sqlConfig);

    const result = await pool.request().input("id", sql.Int, id).query("DELETE FROM Users WHERE UserID = @id");

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  })
);

//-------------------------------------------------------------------------

// Local development
if (process.env.ENV === "local") {
  const PORT = process.env.PORT ?? "3000";

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

app.use(errorHandler);

export const handler = serverless(app);

// Middleware for error handling
// If the error is of type RequestError, returns the status and error message

function errorHandler(err: Error, req: Request, res: Response, next: express.NextFunction) {
  if (res.headersSent) {
    next(err);
    return;
  }

  const msg = err.message || "Internal Server Error";
  res.json(msg);
}

function wrapAsync(fn: (req: Request, res: Response, next: express.NextFunction) => Promise<void>) {
  return function (req: Request, res: Response, next: express.NextFunction) {
    fn(req, res, next).catch(next);
  };
}

//---------------------------------------------------------------------------

/*
JS Data Type To SQL Data Type Map

String -> sql.NVarChar
Number -> sql.Int
Boolean -> sql.Bit
Date -> sql.DateTime
Buffer -> sql.VarBinary
sql.Table -> sql.TVP
*/
