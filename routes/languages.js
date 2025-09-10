/**
 * @swagger
 * tags:
 *   name: Languages
 *   description: Languages related endpoints
 */

/**
 * @swagger
 * /languages:
 *   get:
 *     summary: Retrieve a list of languages
 *     tags: [Languages]
 *     responses:
 *       200:
 *         description: A list of languages
 *         content:
 *           application/json:
 *             example:
 *               - Id: 1
 *                 Name: "English"
 *               - Id: 2
 *                 Name: "Portuguese"
 *               - Id: 3
 *                 Name: "Spanish"
 *               - Id: 4
 *                 Name: "Italian"
 *               - Id: 5
 *                 Name: "Norwegian"
 *               - Id: 6
 *                 Name: "French"
 *               - Id: 7
 *                 Name: "German"
 */

/**
 * @swagger
 * /languages/{id}:
 *   get:
 *     summary: Retrieve a single language by ID
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The language ID
 *     responses:
 *       200:
 *         description: Language found
 *         content:
 *           application/json:
 *             example:
 *               Id: 1
 *               Name: "English"
 *       404:
 *         description: Language not found
 */

/**
 * @swagger
 * /languages:
 *   post:
 *     summary: Create a new language
 *     tags: [Languages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Name: "French"
 *     responses:
 *       201:
 *         description: Language created
 *         content:
 *           application/json:
 *             example:
 *               Id: 3
 *               Name: "French"
 */

/**
 * @swagger
 * /languages/{id}:
 *   put:
 *     summary: Update an existing language
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The language ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Name: "German"
 *     responses:
 *       200:
 *         description: Language updated
 *         content:
 *           application/json:
 *             example:
 *               Id: 3
 *               Name: "German"
 *       404:
 *         description: Language not found
 */

/**
 * @swagger
 * /languages/{id}:
 *   delete:
 *     summary: Delete a language
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The language ID
 *     responses:
 *       200:
 *         description: Language deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Language deleted successfully"
 *       404:
 *         description: Language not found
 */
