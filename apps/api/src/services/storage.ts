import { log } from "@ryuk/logger";
import sdk, { InputFile, Permission, Role } from "node-appwrite";

const client = new sdk.Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65df676aaa7599f7b244")
  .setKey(
    "6a56177a49b886a32827466c0b100583f406d65a3d2e56ed4da69307f041b88fe5f27c2801cf2d341bd750f499d9d723ecb1dfc4e7589990d40632a82e53f8e8a50db7d7650eb6b7ce1595fb41a17f0537d4abfbb2d2749c6b576f924369f4465fcf115771eb77e1a641d4ce79082272e7e2d33e503b080bdd08344075e84881"
  );
const bucketId = "65df67c6c811ff0d5711";
const permissions = ["*"];
const audioCollection = "65df67c6c811ff0d5711";

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
    const file = await storage.getFile(bucketId, fileId);
    // Download audio file
    const fileData = await storage.getFileDownload(bucketId, fileId);
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

  // Upload audio file to Appwrite bucket
  try {
    const file = await storage.createFile(
      bucketId,
      sdk.ID.unique(),
      InputFile.fromPath(`./uploads/${filename}`, filename),
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ]
    );

    return { audioUrl: file.$id };
  } catch (error: any) {
    log("Error uploading file: " + error);
    throw new Error(error);
  }
};
