import express, { Router } from "express";
import serverless from "serverless-http";

const app = express();
const router = Router();

router.get("/", (_req, res) => {
  res.send("Hello World root!");
});

router.get("/hello", (_req, res) => {
  res.send("Hello World!");
});

router.get("/books", (_req, res) => {
  res.send([]);
});

// NO!
// /api/GetBooksById?bookId=abc
// /api/GetBooksByTitle?title=abc
router.get("/GetBooksById", (req, res) => {
  // lookup nel db e fetch the book by ID
  const bookId = req.query.bookId;

  // dummy response
  res.send({
    bookId: bookId,
    title: "Sample Book Title",
  });
});

// /api/books/:bookId
router.get("/books/:bookId", (req, res) => {
  // lookup nel db e fetch the book by ID
  const bookId = req.params.bookId;

  // dummy response
  res.send({
    bookId: bookId,
    title: "Sample Book Title",
  });
});

// /api/books/:bookId
router.delete("/books/:bookId", (req, res) => {
  // lookup nel db e fetch the book by ID
  const bookId = req.params.bookId;
  console.log(`Deleting book with ID: ${bookId}`);

  // dummy response
  res.send(true);
});

interface BookCreateRequest {
  title: string;
}

// /api/books/:bookId
router.post("/books", (req, res) => {
  // lookup nel db e fetch the book by ID
  const body = req.body as BookCreateRequest;
  const title = body.title;
  if (!title) {
    res.status(400).send("Title is required");
    return;
  }

  // dummy response
  res.send(true);
});

interface BookEditRequest {
  title: string;
}

// /api/books/:bookId
router.put("/books/:bookId", (req, res) => {
  // lookup nel db e fetch the book by ID
  const body = req.body as BookEditRequest;
  const title = body.title;
  if (!title) {
    res.status(400).send("Title is required");
    return;
  }

  // dummy response
  res.send(true);
});

app.use("/api/", router);

// Middleware to parse JSON bodies
app.use(express.json());

// Export the handler to be used in Netlify
export const handler = serverless(app);
