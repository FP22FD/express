# express

## 🗺️ Project Plan Summary

### 1. Idea

- **Application for a book library** (likely registration, browsing, purchase/borrowing).

### 2. Prototype

Prototype and project architecture, showing the complete flow from the database to the user interface:

- [Project architecture flow](assets/images/project-architecture-flow.jpg) – general overview of the project flow
- System architecture diagrams:
  - [System architecture diagram](assets/images/system-architecture-diagram.png) – main architecture in SQL Server
  - [Backend-Frontend pipeline](assets/images/backend-frontend-pipeline.jpg) – flow between backend and frontend
  - [Bookstore app interface](assets/images/bookstore-app-interface.jpg) – draft of the website interface

### 3. Database

- **Azure SQL Server** → database hosted on Microsoft Azure cloud.
- **SQL Server / SSMS (SQL Server Management Studio)** → tool for creating and managing tables, queries, procedures, etc.

### 4. Backend (API with Express)

- **Express API** → REST API developed with Node.js + Express.
- **Postman** → for testing API endpoints.
- **Middleware** → intermediate functions (e.g.: authentication, validation, CORS).
- **CORS** → allows the frontend (e.g. Netlify) to access the backend hosted on another domain.
- **Pipeline** → deployment and continuous integration (CI/CD) flow with Azure DevOps or GitHub Actions.

### 5. Frontend / UI

- **Netlify** → where the frontend is hosted (SPA = single page app).
- **Fetch** → the frontend accesses API data with `fetch()`.
- **Auth with SPA repo** → user authentication in the frontend.

### 6. Authentication & Security

- **Auth session cookie** → user session saved in a cookie.
- **Middleware** → where authentication is handled.
- **Password + crypto + hash** → secure password storage (e.g.: bcrypt, crypto).
- **Azure Storage** → for saving files (e.g.: book cover images).

### 7. Documentation

- **OpenAPI / Swagger** → automatic API documentation.

### 8. Other technologies (probably optional or for study)

- **C#, Razor Pages, MVC, EF Core, WebAPI C#** → .NET part (for study or comparison with Node).
- **HTTP, OAPI (OpenAPI)** → protocols and standards for APIs.

### 9. How to View Swagger Documentation

To see the API documentation locally:

1. Open a terminal in the project folder.
2. Generated the TSOA spec and routes by running `tsoa-all`.
3. Start the development server.
4. Open your browser and follow the link for Swagger docs.

```bash
npm run tsoa-all
npm run dev
```

## Resource

- Swagger: [Manual setup guide](https://dev.to/cuongnp/swagger-nodejs-express-a-step-by-step-guide-4ob)
- Swagger: [Automatic setup guide](https://dev.to/tomekbuszewski/how-to-add-openapi-to-your-express-app-24k4)
