import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';


export const secureStorage = {
    async getItemAsync(key: string): Promise<string | null> {
        if (Platform.OS === 'web') {
            return AsyncStorage.getItem(key);
        }
        return SecureStore.getItemAsync(key);
    },

    async setItemAsync(key: string, value: string): Promise<void> {
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem(key, value);
            return;
        }
        await SecureStore.setItemAsync(key, value);
    },

    async deleteItemAsync(key: string): Promise<void> {
        if (Platform.OS === 'web') {
            await AsyncStorage.removeItem(key);
            return;
        }
        await SecureStore.deleteItemAsync(key);
    },
};