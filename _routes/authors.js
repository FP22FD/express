/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Auth related endpoints
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retrieve a list of authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   AuthorId:
 *                     type: integer
 *                   Name:
 *                     type: string
 *                   Middlename:
 *                     type: string
 *                   Surname:
 *                     type: string
 *             examples:
 *               seedData:
 *                 summary: Example seed data
 *                 value:
 *                   - AuthorId: 1
 *                     Name: Charles
 *                     Middlename: ""
 *                     Surname: Duhigg
 *                   - AuthorId: 2
 *                     Name: Antony
 *                     Middlename: ""
 *                     Surname: Robbins
 *                   - AuthorId: 3
 *                     Name: Erlend
 *                     Middlename: ""
 *                     Surname: Loe
 *                   - AuthorId: 4
 *                     Name: Zeshan
 *                     Middlename: ""
 *                     Surname: Shakar
 *                   - AuthorId: 5
 *                     Name: Gayle
 *                     Middlename: ""
 *                     Surname: Forman
 *                   - AuthorId: 6
 *                     Name: Kent
 *                     Middlename: ""
 *                     Surname: Boogaart
 *                   - AuthorId: 7
 *                     Name: Knut
 *                     Middlename: ""
 *                     Surname: Næsheim
 *                   - AuthorId: 8
 *                     Name: Janne
 *                     Middlename: Olsen
 *                     Surname: Hals
 */

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Retrieve a specific author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A specific author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 AuthorId:
 *                   type: integer
 *                 Name:
 *                   type: string
 *                 Middlename:
 *                   type: string
 *                 Surname:
 *                   type: string
 *               required:
 *                 - AuthorId
 *                 - Name
 *                 - Surname
 *             examples:
 *               seedData:
 *                 summary: Example seed data
 *                 value:
 *                   - AuthorId: 1
 *                     Name: Charles
 *                     Middlename: ""
 *                     Surname: Duhigg
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Name: "New"
 *             Middlename: ""
 *             Surname: "Author"
 *     responses:
 *       201:
 *         description: Author created
 *         content:
 *           application/json:
 *             example:
 *               AuthorId: 9
 *               Name: "New"
 *               Middlename: ""
 *               Surname: "Author"
 */

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Name: "Charles"
 *             Middlename: ""
 *             Surname: "Duhigg"
 *     responses:
 *       200:
 *         description: Author updated
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               Name: "German"
 *               Middlename: ""
 *               Surname: "Duhigg"
 *       404:
 *         description: Author not found
 */

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Author deleted successfully"
 *       404:
 *         description: Author not found
 */
