import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../types";

const USER_DATA_KEY = "@user_data";

export const storage = {
  saveUserData: async (userData: UserData): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
    } catch (e) {
      console.error("Failed to save user data", e);
    }
  },

  getUserData: async (): Promise<UserData | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Failed to get user data", e);
      return null;
    }
  },

  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Failed to clear storage", e);
    }
  },
};
