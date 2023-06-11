import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AsyncStorageService {
  public static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
