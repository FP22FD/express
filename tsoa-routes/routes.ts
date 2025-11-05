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
import multer from "multer";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  UserCreateRequest: {
    dataType: "refObject",
    properties: {
      username: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserResponse: {
    dataType: "refObject",
    properties: {
      userId: { dataType: "double", required: true },
      username: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserUpdateRequest: {
    dataType: "refObject",
    properties: {
      username: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateLanguageRequest: {
    dataType: "refObject",
    properties: {
      languageCode: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  LanguageResponse: {
    dataType: "refObject",
    properties: {
      languageCode: { dataType: "string", required: true },
      languageId: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateLanguageRequest: {
    dataType: "refObject",
    properties: {
      languageCode: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  BookAuthorCreateRequest: {
    dataType: "refObject",
    properties: {
      authorId: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  BookCreateRequest: {
    dataType: "refObject",
    properties: {
      description: { dataType: "string", required: true },
      downloadUrl: { dataType: "string" },
      imageUrl: { dataType: "string" },
      isbn: { dataType: "string", required: true },
      languageId: { dataType: "double", required: true },
      title: { dataType: "string", required: true },
      year: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  BookAuthorResponse: {
    dataType: "refObject",
    properties: {
      authorId: { dataType: "double", required: true },
      bookId: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  BookResponse: {
    dataType: "refObject",
    properties: {
      bookId: { dataType: "double", required: true },
      createdAtUtc: { dataType: "string", required: true },
      createdBy: { dataType: "double", required: true },
      description: { dataType: "string", required: true },
      downloadUrl: { dataType: "string" },
      imageUrl: { dataType: "string" },
      isbn: { dataType: "string", required: true },
      languageId: { dataType: "double", required: true },
      modifiedAtUtc: { dataType: "string", required: true },
      modifiedBy: { dataType: "double", required: true },
      title: { dataType: "string", required: true },
      year: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  BookUpdateRequest: {
    dataType: "refObject",
    properties: {
      description: { dataType: "string", required: true },
      downloadUrl: { dataType: "string" },
      imageUrl: { dataType: "string" },
      isbn: { dataType: "string", required: true },
      languageId: { dataType: "double", required: true },
      title: { dataType: "string", required: true },
      year: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AuthorCreateRequest: {
    dataType: "refObject",
    properties: {
      middlename: { dataType: "string" },
      name: { dataType: "string", required: true },
      surname: { dataType: "string" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AuthorResponse: {
    dataType: "refObject",
    properties: {
      authorId: { dataType: "double", required: true },
      middlename: { dataType: "string" },
      name: { dataType: "string", required: true },
      surname: { dataType: "string" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AuthorUpdateRequest: {
    dataType: "refObject",
    properties: {
      middlename: { dataType: "string" },
      name: { dataType: "string", required: true },
      surname: { dataType: "string" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, { noImplicitAdditionalProperties: "throw-on-extras", bodyCoercion: true });

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router, opts?: { multer?: ReturnType<typeof multer> }) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const upload = opts?.multer || multer({ limits: { fileSize: 8388608 } });

  const argsUsersController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
    body: { in: "body", name: "body", required: true, ref: "UserCreateRequest" },
  };
  app.post(
    "/api/users",
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
    "/api/users/:id",
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
    "/api/users/:id",
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
    "/api/users",
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
    body: { in: "body", name: "body", required: true, ref: "UserUpdateRequest" },
  };
  app.put(
    "/api/users/:id",
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
    body: { in: "body", name: "body", required: true, ref: "CreateLanguageRequest" },
  };
  app.post(
    "/api/languages",
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
    "/api/languages/:id",
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
    "/api/languages/:id",
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
    "/api/languages",
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
    body: { in: "body", name: "body", required: true, ref: "UpdateLanguageRequest" },
  };
  app.put(
    "/api/languages/:id",
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
  const argsBooksController_addAuthorToBook: Record<string, TsoaRoute.ParameterSchema> = {
    bookId: { in: "path", name: "bookId", required: true, dataType: "double" },
    body: { in: "body", name: "body", required: true, ref: "BookAuthorCreateRequest" },
  };
  app.post(
    "/api/books/:bookId/authors",
    ...fetchMiddlewares<RequestHandler>(BooksController),
    ...fetchMiddlewares<RequestHandler>(BooksController.prototype.addAuthorToBook),

    async function BooksController_addAuthorToBook(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsBooksController_addAuthorToBook, request, response });

        const controller = new BooksController();

        await templateService.apiHandler({
          methodName: "addAuthorToBook",
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
  const argsBooksController_addImageToBook: Record<string, TsoaRoute.ParameterSchema> = {
    bookId: { in: "path", name: "bookId", required: true, dataType: "double" },
    file: { in: "formData", name: "file", required: true, dataType: "file" },
  };
  app.post(
    "/api/books/:bookId/upload",
    upload.fields([
      {
        name: "file",
        maxCount: 1,
      },
    ]),
    ...fetchMiddlewares<RequestHandler>(BooksController),
    ...fetchMiddlewares<RequestHandler>(BooksController.prototype.addImageToBook),

    async function BooksController_addImageToBook(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsBooksController_addImageToBook, request, response });

        const controller = new BooksController();

        await templateService.apiHandler({
          methodName: "addImageToBook",
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
  const argsBooksController_createBook: Record<string, TsoaRoute.ParameterSchema> = {
    body: { in: "body", name: "body", required: true, ref: "BookCreateRequest" },
  };
  app.post(
    "/api/books",
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
    "/api/books/:id",
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
  const argsBooksController_getAuthorsByBook: Record<string, TsoaRoute.ParameterSchema> = {
    bookId: { in: "path", name: "bookId", required: true, dataType: "double" },
  };
  app.get(
    "/api/books/:bookId/authors",
    ...fetchMiddlewares<RequestHandler>(BooksController),
    ...fetchMiddlewares<RequestHandler>(BooksController.prototype.getAuthorsByBook),

    async function BooksController_getAuthorsByBook(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsBooksController_getAuthorsByBook, request, response });

        const controller = new BooksController();

        await templateService.apiHandler({
          methodName: "getAuthorsByBook",
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
    "/api/books/:id",
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
    "/api/books",
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
  const argsBooksController_removeAuthorFromBook: Record<string, TsoaRoute.ParameterSchema> = {
    bookId: { in: "path", name: "bookId", required: true, dataType: "double" },
    authorId: { in: "path", name: "authorId", required: true, dataType: "double" },
  };
  app.delete(
    "/api/books/:bookId/authors/:authorId",
    ...fetchMiddlewares<RequestHandler>(BooksController),
    ...fetchMiddlewares<RequestHandler>(BooksController.prototype.removeAuthorFromBook),

    async function BooksController_removeAuthorFromBook(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsBooksController_removeAuthorFromBook, request, response });

        const controller = new BooksController();

        await templateService.apiHandler({
          methodName: "removeAuthorFromBook",
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
    body: { in: "body", name: "body", required: true, ref: "BookUpdateRequest" },
  };
  app.put(
    "/api/books/:id",
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
    body: { in: "body", name: "body", required: true, ref: "AuthorCreateRequest" },
  };
  app.post(
    "/api/authors",
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
    "/api/authors/:id",
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
    "/api/authors/:id",
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
    "/api/authors",
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
  const argsAuthorsController_getBooksByAuthor: Record<string, TsoaRoute.ParameterSchema> = {
    authorId: { in: "path", name: "authorId", required: true, dataType: "double" },
  };
  app.get(
    "/api/authors/:authorId/books",
    ...fetchMiddlewares<RequestHandler>(AuthorsController),
    ...fetchMiddlewares<RequestHandler>(AuthorsController.prototype.getBooksByAuthor),

    async function AuthorsController_getBooksByAuthor(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsAuthorsController_getBooksByAuthor, request, response });

        const controller = new AuthorsController();

        await templateService.apiHandler({
          methodName: "getBooksByAuthor",
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
    body: { in: "body", name: "body", required: true, ref: "AuthorUpdateRequest" },
  };
  app.put(
    "/api/authors/:id",
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
