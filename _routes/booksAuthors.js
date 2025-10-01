// routes/booksAuthors.js
// import express from "express";
// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: BookAuthors
//  *   description: Book authors related endpoints
//  */

// /**
//  * @swagger
//  * /bookauthors:
//  *   get:
//  *     summary: Retrieve a list of book authors
//  *     tags: BookAuthors
//  *     responses:
//  *       200:
//  *         description: A list of book authors
//  *         content:
//  *           application/json:
//  *             example:
//  *               - BookAuthorId: 1
//  *                 BookId: 1
//  *                 AuthorId: 1
//  *               - BookAuthorId: 2
//  *                 BookId: 1
//  *                 AuthorId: 2
//  */
// router.get("/bookauthors", (req, res) => {
//     res.json([
//         { BookAuthorId: 1, BookId: 1, AuthorId: 1 },
//         { BookAuthorId: 2, BookId: 1, AuthorId: 2 },
//     ]);
// });

// /**
//  * @swagger
//  * /bookauthors/{id}:
//  *   get:
//  *     summary: Retrieve a single book author by ID
//  *     tags: BookAuthors
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: The BookAuthor ID
//  *     responses:
//  *       200:
//  *         description: BookAuthor found
//  *         content:
//  *           application/json:
//  *             example:
//  *               BookAuthorId: 1
//  *               BookId: 1
//  *               AuthorId: 1
//  *       404:
//  *         description: BookAuthor not found
//  */
// router.get("/bookauthors/:id", (req, res) => {
//     const { id: BookAuthorId } = req.params;
//     res.json({ BookAuthorId, BookId: 1, AuthorId: 1 });
// });

// /**
//  * @swagger
//  * /bookauthors:
//  *   post:
//  *     summary: Create a new book author
//  *     tags: BookAuthors
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           example:
//  *             BookId: 1
//  *             AuthorId: 3
//  *     responses:
//  *       201:
//  *         description: BookAuthor created
//  *         content:
//  *           application/json:
//  *             example:
//  *               BookAuthorId: 3
//  *               BookId: 1
//  *               AuthorId: 3
//  */
// router.post("/bookauthors", (req, res) => {
//     const { BookId, AuthorId } = req.body;
//     res.status(201).json({ BookAuthorId: 3, BookId, AuthorId });
// });

// /**
//  * @swagger
//  * /bookauthors/{id}:
//  *   put:
//  *     summary: Update an existing book author
//  *     tags: BookAuthors
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: The BookAuthor ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           example:
//  *             BookId: 1
//  *             AuthorId: 4
//  *     responses:
//  *       200:
//  *         description: BookAuthor updated
//  *         content:
//  *           application/json:
//  *             example:
//  *               BookAuthorId: 3
//  *               BookId: 1
//  *               AuthorId: 4
//  *       404:
//  *         description: BookAuthor not found
//  */
// router.put("/bookauthors/:id", (req, res) => {
//     const { id: BookAuthorId } = req.params;
//     const { BookId, AuthorId } = req.body;
//     res.json({ BookAuthorId, BookId, AuthorId });
// });

// /**
//  * @swagger
//  * /bookauthors/{id}:
//  *   delete:
//  *     summary: Delete a book author
//  *     tags: BookAuthors
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: The BookAuthor ID
//  *     responses:
//  *       200:
//  *         description: BookAuthor deleted
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: "BookAuthor deleted successfully"
//  *       404:
//  *         description: BookAuthor not found
//  */
// router.delete("/bookauthors/:id", (req, res) => {
//     const { id: BookAuthorId } = req.params;
//     res.json({ message: "BookAuthor deleted successfully", BookAuthorId });
// });

// export default router;
