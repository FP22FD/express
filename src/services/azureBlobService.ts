// Upload buffer (from multer memory storage) to Azure Blob Storage

import { BlobSASPermissions, BlockBlobClient, generateBlobSASQueryParameters, StorageSharedKeyCredential } from "@azure/storage-blob";

import { AZURE_CONTAINER_NAME, AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_KEY, blobServiceClient } from "../config/azure";

export function getSignedDownloadUrl(blobName: string) {
  const accountName = AZURE_STORAGE_ACCOUNT_NAME;
  const containerName = AZURE_CONTAINER_NAME;
  const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);

  const b = containerClient.getBlockBlobClient(blobName);
  const sas = createSASReadString(AZURE_STORAGE_KEY, accountName, containerName);
  const signature = b.url + "?" + sas.toString();
  return signature;
}

export async function uploadBufferToAzure(buffer: Buffer, originalname: string, mimeType: string) {
  const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);

  const timestamp = Date.now();
  const sanitized = originalname.replace(/\s+/g, "-");
  const blobName = `${timestamp.toString()}-${sanitized}`;

  const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: mimeType },
  });

  return { blobName, url: blockBlobClient.url };
}

function createSASReadString(key: string, accountName: string, containerName: string, duration = 5) {
  const permissions = new BlobSASPermissions();
  permissions.read = true;

  const currentDateTime = new Date();
  const expiryDateTime = new Date(currentDateTime.setMinutes(currentDateTime.getMinutes() + duration));
  const blobSasModel = {
    containerName,
    expiresOn: expiryDateTime,
    permissions,
  };

  const credential = new StorageSharedKeyCredential(accountName, key);
  return generateBlobSASQueryParameters(blobSasModel, credential);
}
