# 📚 Legacy Swagger Documentation (Manual)

This directory contains **no longer used** Swagger documentation files that were manually created before migrating to [TSOA](https://tsoa-community.github.io/docs/) / automated OpenAPI.

## Context

Before adopting automatic documentation generation, endpoints were manually described with `@swagger` comments in the Express route code.

These files have been moved to this directory for **historical reference only** and may be removed in the future.

## 📂 Structure

- `books.routes.js` (example shown below)  
   Contained schema definitions and CRUD endpoints for the **Books** entity.

### Example of manually commented snippet

```js
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books related endpoints
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
 */
```
