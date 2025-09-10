import express from "express";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books related endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         BookId:
 *           type: integer
 *           example: 1
 *         Title:
 *           type: string
 *           example: "Il potere delle abitudine"
 *         Year:
 *           type: integer
 *           example: 2015
 *         LanguageID:
 *           type: integer
 *           example: 4
 *         ISBN:
 *           type: integer
 *           example: 9788850236909
 *         Description:
 *           type: string
 *           example: "Come si formano. Quanto ci condizionano. Come cambiarle."
 *         DownloadURL:
 *           type: string
 *           example: "http://example.com/download/9788850236909"
 *         ImageURL:
 *           type: string
 *           example: "http://example.com/images/9788850236909.jpg"
 *         CreatedBy:
 *           type: integer
 *           example: 1
 *         CreatedAtUtc:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *         ModifiedBy:
 *           type: integer
 *           example: 1
 *         ModifiedAtUtc:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *     DeleteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Book deleted successfully"
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Default Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *       404:
 *         description: Book not found
 */

export default router;
