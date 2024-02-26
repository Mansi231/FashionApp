import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  user:'user',
  is_verified:'is_verified',
  access_token:'access_token',
  wishlist:"wishlist",
}

const AsyncStorageUtil = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key} in AsyncStorage: ${error}`);
    }
  },
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error(`Error getting ${key} from AsyncStorage: ${error}`);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from AsyncStorage: ${error}`);
    }
  },
};

export default AsyncStorageUtil;
