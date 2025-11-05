import dotenv from "dotenv";
import express, { Request as ExRequest, Response as ExResponse } from "express";
import serverless from "serverless-http";
import swaggerUi from "swagger-ui-express";

import { camelcaseResponse } from "./src/middlewares/camelcaseResponse";
import { corsHandler } from "./src/middlewares/cors";
import { errorHandler } from "./src/middlewares/errorHandler";
import routes from "./src/routes/indexRoutes";
import { RegisterRoutes } from "./tsoa-routes/routes.js";
import swaggerDocument from "./tsoa-routes/swagger.json" with { type: "json" };

dotenv.config();

const app = express();

// 1. Middleware global
app.use(corsHandler);
app.use(express.json());
app.use(camelcaseResponse);

// 2. Routes
// app.use("/api", routes); // import custom "/api" and upload routes. Use asyncHandler to catch errors from here
RegisterRoutes(app); // tsoa routes. Use errorHandler to catch errors from here
app.use("/api", routes); // import custom "/api" and upload routes. Use asyncHandler to catch errors from here

// 4. Swagger UI setup
const options = {
  swaggerOptions: {
    defaultModelExpandDepth: 0, // <- avoid expand all models
    defaultModelsExpandDepth: -1, // <- hide "Schemas" tab
  },
};

app.use("/api-docs", swaggerUi.serve, (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(swaggerDocument, options));
});

// 5. Middleware error handler (should be the last)
app.use(errorHandler);

// 6. Start server only if running locally
if (process.env.ENV === "local") {
  const port = process.env.PORT ?? "3000";

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);
  });
}

export const handler = serverless(app);
