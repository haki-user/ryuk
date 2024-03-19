import { log } from "@ryuk/logger";
import sdk, { InputFile, Permission, Role } from "node-appwrite";

const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;
const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const APPWRITE_STORAGE_BUCKET_ID = process.env.APPWRITE_STORAGE_BUCKET_ID;
if (
  !APPWRITE_API_KEY ||
  !APPWRITE_ENDPOINT ||
  !APPWRITE_PROJECT_ID ||
  !APPWRITE_STORAGE_BUCKET_ID
) {
  throw new Error("Appwrite environment variables not set");
}

const client = new sdk.Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);
const permissions = ["*"];

/**
 * Retrieves an audio file from the Appwrite storage.
 * @param fileId - The ID of the audio file to retrieve.
 * @returns An object containing the file data and file information.
 * @throws An error if the retrieval fails.
 */
export const getAudio = async ({ fileId }: { fileId: string }) => {
  try {
    // Initialize Appwrite storage
    const storage = new sdk.Storage(client);
    // Get file info
    const file = await storage.getFile(APPWRITE_STORAGE_BUCKET_ID, fileId);
    // Download audio file
    const fileData = await storage.getFileDownload(
      APPWRITE_STORAGE_BUCKET_ID,
      fileId
    );
    return { fileData, file };
  } catch (e) {
    log(e);
    throw new Error("Failed to get audio file");
  }
};

/**
 * Uploads an audio file to the Appwrite storage.
 * @param fileName - The name of the audio file to upload.
 * @returns An object containing the URL of the uploaded file.
 * @throws An error if the file upload fails.
 */
export const uploadAudio = async (filename: string) => {
  const storage = new sdk.Storage(client);
  try {
    const file = await storage.createFile(
      APPWRITE_STORAGE_BUCKET_ID,
      sdk.ID.unique(),
      InputFile.fromPath(`./uploads/${filename}`, Date.now()+"webm"),
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ]
    );

    return {
      audioUrl: `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_STORAGE_BUCKET_ID}/files/${file.$id}/view?project=${APPWRITE_PROJECT_ID}`,
    };
  } catch (error: any) {
    log("Error uploading file: " + error);
    throw new Error(error);
  }
};
