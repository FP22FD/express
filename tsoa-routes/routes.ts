/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from "@tsoa/runtime";
import { fetchMiddlewares, ExpressTemplateService } from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from "./../src/controllers/usersController.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LanguagesController } from "./../src/controllers/languagesController.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BooksController } from "./../src/controllers/booksController.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthorsController } from "./../src/controllers/authorsController.js";
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  User: {
    dataType: "refObject",
    properties: {
      Id: { dataType: "double", required: true },
      Name: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Partial_User_: {
    dataType: "refAlias",
    type: { dataType: "nestedObjectLiteral", nestedProperties: { Id: { dataType: "double" }, Name: { dataType: "string" } }, validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Language: {
    dataType: "refObject",
    properties: {
      Id: { dataType: "double", required: true },
      Name: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Partial_Language_: {
    dataType: "refAlias",
    type: { dataType: "nestedObjectLiteral", nestedProperties: { Id: { dataType: "double" }, Name: { dataType: "string" } }, validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Book: {
    dataType: "refObject",
    properties: {
      BookId: { dataType: "double", required: true },
      CreatedAtUtc: { dataType: "string", required: true },
      CreatedBy: { dataType: "double", required: true },
      Description: { dataType: "string", required: true },
      DownloadURL: { dataType: "string", required: true },
      ImageURL: { dataType: "string", required: true },
      ISBN: { dataType: "double", required: true },
      LanguageID: { dataType: "double", required: true },
      ModifiedAtUtc: { dataType: "string", required: true },
      ModifiedBy: { dataType: "double", required: true },
      Title: { dataType: "string", required: true },
      Year: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Partial_Book_: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        BookId: { dataType: "double" },
        CreatedAtUtc: { dataType: "string" },
        CreatedBy: { dataType: "double" },
        Description: { dataType: "string" },
        DownloadURL: { dataType: "string" },
        ImageURL: { dataType: "string" },
        ISBN: { dataType: "double" },
        LanguageID: { dataType: "double" },
        ModifiedAtUtc: { dataType: "string" },
        ModifiedBy: { dataType: "double" },
        Title: { dataType: "string" },
        Year: { dataType: "double" },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Author: {
    dataType: "refObject",
    properties: {
      AuthorId: { dataType: "double", required: true },
      Middlename: { dataType: "string", required: true },
      Name: { dataType: "string", required: true },
      Surname: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Partial_Author_: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        AuthorId: { dataType: "double" },
        Middlename: { dataType: "string" },
        Name: { dataType: "string" },
        Surname: { dataType: "string" },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, { noImplicitAdditionalProperties: "throw-on-extras", bodyCoercion: true });

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const argsUsersController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
    body: { in: "body", name: "body", required: true, ref: "User" },
  };
  app.post(
    "/users",
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.createUser),

    async function UsersController_createUser(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_createUser, request, response });

        const controller = new UsersController();

        await templateService.apiHandler({
          methodName: "createUser",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUsersController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
  };
  app.delete(
    "/users/:id",
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.deleteUser),

    async function UsersController_deleteUser(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_deleteUser, request, response });

        const controller = new UsersController();

        await templateService.apiHandler({
          methodName: "deleteUser",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUsersController_getUser: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
  };
  app.get(
    "/users/:id",
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.getUser),

    async function UsersController_getUser(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_getUser, request, response });

        const controller = new UsersController();

        await templateService.apiHandler({
          methodName: "getUser",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUsersController_getUsers: Record<string, TsoaRoute.ParameterSchema> = {};
  app.get(
    "/users",
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.getUsers),

    async function UsersController_getUsers(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_getUsers, request, response });

        const controller = new UsersController();

        await templateService.apiHandler({
          methodName: "getUsers",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUsersController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
    body: { in: "body", name: "body", required: true, ref: "Partial_User_" },
  };
  app.put(
    "/users/:id",
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.updateUser),

    async function UsersController_updateUser(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_updateUser, request, response });

        const controller = new UsersController();

        await templateService.apiHandler({
          methodName: "updateUser",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsLanguagesController_createLanguage: Record<string, TsoaRoute.ParameterSchema> = {
    body: { in: "body", name: "body", required: true, ref: "Language" },
  };
  app.post(
    "/languages",
    ...fetchMiddlewares<RequestHandler>(LanguagesController),
    ...fetchMiddlewares<RequestHandler>(LanguagesController.prototype.createLanguage),

    async function LanguagesController_createLanguage(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsLanguagesController_createLanguage, request, response });

        const controller = new LanguagesController();

        await templateService.apiHandler({
          methodName: "createLanguage",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsLanguagesController_deleteLanguage: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
  };
  app.delete(
    "/languages/:id",
    ...fetchMiddlewares<RequestHandler>(LanguagesController),
    ...fetchMiddlewares<RequestHandler>(LanguagesController.prototype.deleteLanguage),

    async function LanguagesController_deleteLanguage(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsLanguagesController_deleteLanguage, request, response });

        const controller = new LanguagesController();

        await templateService.apiHandler({
          methodName: "deleteLanguage",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsLanguagesController_getLanguage: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
  };
  app.get(
    "/languages/:id",
    ...fetchMiddlewares<RequestHandler>(LanguagesController),
    ...fetchMiddlewares<RequestHandler>(LanguagesController.prototype.getLanguage),

    async function LanguagesController_getLanguage(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsLanguagesController_getLanguage, request, response });

        const controller = new LanguagesController();

        await templateService.apiHandler({
          methodName: "getLanguage",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsLanguagesController_getLanguages: Record<string, TsoaRoute.ParameterSchema> = {};
  app.get(
    "/languages",
    ...fetchMiddlewares<RequestHandler>(LanguagesController),
    ...fetchMiddlewares<RequestHandler>(LanguagesController.prototype.getLanguages),

    async function LanguagesController_getLanguages(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsLanguagesController_getLanguages, request, response });

        const controller = new LanguagesController();

        await templateService.apiHandler({
          methodName: "getLanguages",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsLanguagesController_updateLanguage: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
    body: { in: "body", name: "body", required: true, ref: "Partial_Language_" },
  };
  app.put(
    "/languages/:id",
    ...fetchMiddlewares<RequestHandler>(LanguagesController),
    ...fetchMiddlewares<RequestHandler>(LanguagesController.prototype.updateLanguage),

    async function LanguagesController_updateLanguage(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsLanguagesController_updateLanguage, request, response });

        const controller = new LanguagesController();

        await templateService.apiHandler({
          methodName: "updateLanguage",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsBooksController_createBook: Record<string, TsoaRoute.ParameterSchema> = {
    body: { in: "body", name: "body", required: true, ref: "Book" },
  };
  app.post(
    "/books",
    ...fetchMiddlewares<RequestHandler>(BooksController),
    ...fetchMiddlewares<RequestHandler>(BooksController.prototype.createBook),

    async function BooksController_createBook(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsBooksController_createBook, request, response });

        const controller = new BooksController();

        await templateService.apiHandler({
          methodName: "createBook",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsBooksController_deleteBook: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
  };
  app.delete(
    "/books/:id",
    ...fetchMiddlewares<RequestHandler>(BooksController),
    ...fetchMiddlewares<RequestHandler>(BooksController.prototype.deleteBook),

    async function BooksController_deleteBook(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsBooksController_deleteBook, request, response });

        const controller = new BooksController();

        await templateService.apiHandler({
          methodName: "deleteBook",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsBooksController_getBook: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
  };
  app.get(
    "/books/:id",
    ...fetchMiddlewares<RequestHandler>(BooksController),
    ...fetchMiddlewares<RequestHandler>(BooksController.prototype.getBook),

    async function BooksController_getBook(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsBooksController_getBook, request, response });

        const controller = new BooksController();

        await templateService.apiHandler({
          methodName: "getBook",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsBooksController_getBooks: Record<string, TsoaRoute.ParameterSchema> = {};
  app.get(
    "/books",
    ...fetchMiddlewares<RequestHandler>(BooksController),
    ...fetchMiddlewares<RequestHandler>(BooksController.prototype.getBooks),

    async function BooksController_getBooks(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsBooksController_getBooks, request, response });

        const controller = new BooksController();

        await templateService.apiHandler({
          methodName: "getBooks",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsBooksController_updateBook: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
    body: { in: "body", name: "body", required: true, ref: "Partial_Book_" },
  };
  app.put(
    "/books/:id",
    ...fetchMiddlewares<RequestHandler>(BooksController),
    ...fetchMiddlewares<RequestHandler>(BooksController.prototype.updateBook),

    async function BooksController_updateBook(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsBooksController_updateBook, request, response });

        const controller = new BooksController();

        await templateService.apiHandler({
          methodName: "updateBook",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthorsController_createAuthor: Record<string, TsoaRoute.ParameterSchema> = {
    body: { in: "body", name: "body", required: true, ref: "Author" },
  };
  app.post(
    "/authors",
    ...fetchMiddlewares<RequestHandler>(AuthorsController),
    ...fetchMiddlewares<RequestHandler>(AuthorsController.prototype.createAuthor),

    async function AuthorsController_createAuthor(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsAuthorsController_createAuthor, request, response });

        const controller = new AuthorsController();

        await templateService.apiHandler({
          methodName: "createAuthor",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthorsController_deleteAuthor: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
  };
  app.delete(
    "/authors/:id",
    ...fetchMiddlewares<RequestHandler>(AuthorsController),
    ...fetchMiddlewares<RequestHandler>(AuthorsController.prototype.deleteAuthor),

    async function AuthorsController_deleteAuthor(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsAuthorsController_deleteAuthor, request, response });

        const controller = new AuthorsController();

        await templateService.apiHandler({
          methodName: "deleteAuthor",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthorsController_getAuthor: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
  };
  app.get(
    "/authors/:id",
    ...fetchMiddlewares<RequestHandler>(AuthorsController),
    ...fetchMiddlewares<RequestHandler>(AuthorsController.prototype.getAuthor),

    async function AuthorsController_getAuthor(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsAuthorsController_getAuthor, request, response });

        const controller = new AuthorsController();

        await templateService.apiHandler({
          methodName: "getAuthor",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthorsController_getAuthors: Record<string, TsoaRoute.ParameterSchema> = {};
  app.get(
    "/authors",
    ...fetchMiddlewares<RequestHandler>(AuthorsController),
    ...fetchMiddlewares<RequestHandler>(AuthorsController.prototype.getAuthors),

    async function AuthorsController_getAuthors(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsAuthorsController_getAuthors, request, response });

        const controller = new AuthorsController();

        await templateService.apiHandler({
          methodName: "getAuthors",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthorsController_updateAuthor: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: "path", name: "id", required: true, dataType: "double" },
    body: { in: "body", name: "body", required: true, ref: "Partial_Author_" },
  };
  app.put(
    "/authors/:id",
    ...fetchMiddlewares<RequestHandler>(AuthorsController),
    ...fetchMiddlewares<RequestHandler>(AuthorsController.prototype.updateAuthor),

    async function AuthorsController_updateAuthor(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsAuthorsController_updateAuthor, request, response });

        const controller = new AuthorsController();

        await templateService.apiHandler({
          methodName: "updateAuthor",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
