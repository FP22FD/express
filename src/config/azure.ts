import { BlobServiceClient } from "@azure/storage-blob";

const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!connStr) {
  throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined");
}

export const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME ?? "files";
if (!connStr) {
  throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined");
}

export const AZURE_STORAGE_KEY = process.env.AZURE_STORAGE_KEY ?? "";
if (!AZURE_STORAGE_KEY) {
  throw new Error("AZURE_STORAGE_KEY is not defined");
}

export const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME ?? "";
if (!AZURE_STORAGE_ACCOUNT_NAME) {
  throw new Error("AZURE_STORAGE_ACCOUNT_NAME is not defined");
}

export const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
