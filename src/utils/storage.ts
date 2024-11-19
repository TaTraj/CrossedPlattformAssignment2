import { Storage } from "@ionic/storage";

const storage = new Storage();
await storage.create();

export const saveDataToStorage = async (key: string, data: unknown) => {
    await storage.set(key, JSON.stringify(data));
};

export const getDataFromStorage = async <T>(key: string): Promise<T | null> => {
    const data = await storage.get(key);
    return data ? JSON.parse(data) : null;
};