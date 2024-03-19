import { Client, Account, Databases, Storage, Avatars } from "appwrite";

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const APPWRITE_STORAGE_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID;
const APPWRITE_USERS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

const APPWRITE_HISTORY_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_HISTORY_COLLECTION_ID;

if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID) {
  throw new Error("APPWRITE_ENDPOINT or APPWRITE_PROJECT_ID is not defined");
}
if (
  !APPWRITE_DATABASE_ID ||
  !APPWRITE_STORAGE_ID ||
  !APPWRITE_USERS_COLLECTION_ID ||
  !APPWRITE_HISTORY_COLLECTION_ID
) {
  throw new Error(
    "APPWRITE_DATABASE_ID or APPWRITE_STORAGE_ID or APPWRITE_USER_COLLECTION_ID or APPWRITE_USER_AVATAR_COLLECTION_ID or APPWRITE_HISTORY_COLLECTION_ID is not defined"
  );
}

export const appwriteConfig = {
  endpoint: APPWRITE_ENDPOINT,
  project: APPWRITE_PROJECT_ID,
  databaseId: APPWRITE_DATABASE_ID,
  storageId: APPWRITE_STORAGE_ID,
  usersCollectionId: APPWRITE_USERS_COLLECTION_ID,
  historyCollectionId: APPWRITE_HISTORY_COLLECTION_ID,
};

export const client = new Client();

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export { ID } from "appwrite";
