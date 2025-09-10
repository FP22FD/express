import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import booksRouter from "./routes/books.js";

const app = express();
const port = process.env.PORT ?? "3000";

app.use(express.json()); //Allows receiving JSON in the request body

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // 👈 aqui estava errado
    info: {
      title: "Books API",
      version: "1.0.0",
      description: "API documentation for books",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // all files containing swagger annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1, // Hide schemas section by default in Swagger UI browser docs
    },
  })
);

// Sample route
app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});

// Books routes
app.use("/", booksRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
