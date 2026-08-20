import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { secureStorage } from '@/src/lib/secureStorage';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

import { DeviceEventEmitter } from 'react-native';

interface User {
    id: number;
    nome: string;
}

interface AuthContextData {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    user: User | null;
    login: (token: string, id: number, nome: string) => Promise<void>;
    logout: () => Promise<void>;
    updateNome: (nome: string) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const logout = useCallback(async () => {
        await secureStorage.deleteItemAsync(TOKEN_KEY);
        await AsyncStorage.removeItem(USER_KEY);

        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        (async () => {
            const savedToken = await secureStorage.getItemAsync(TOKEN_KEY);
            const savedUser = await AsyncStorage.getItem(USER_KEY);

            if (savedToken) {
                setIsAuthenticated(true);
                setToken(savedToken);
                setUser(savedUser ? (JSON.parse(savedUser) as User) : null);
            }

            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        const handleLogout = async () => {
            logout();
            router.replace('/login');
        };

        const subscription = DeviceEventEmitter.addListener('auth:logout', handleLogout);
        return () => subscription.remove();
    }, [logout]);

    const login = useCallback(async (token: string, id: number, nome: string) => {
        const newUser = { id, nome };

        await secureStorage.setItemAsync(TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));

        setToken(token);
        setUser(newUser);
        setIsAuthenticated(true);
    }, []);

    const updateNome = useCallback(async (nome: string) => {
        setUser((prev) => {
            if (!prev) return prev;
            const updated = { ...prev, nome };
            AsyncStorage.setItem(USER_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, token, user, login, logout, updateNome }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);