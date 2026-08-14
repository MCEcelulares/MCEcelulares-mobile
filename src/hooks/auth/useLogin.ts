import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { loginAPI } from "../../actions/auth";
import { useAuth } from "../../contexts/AuthContext";

type LoginInput = {
    email: string;
    senha: string;
};

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const execute = useCallback( async(input: LoginInput) => {
        setLoading(true);
        try{
            const data = await loginAPI(input);
            if(!data.success) throw new Error(data.error);

            await login(data.token, data.id_usuario, data.nome);
            return { success: true as const };
        } catch (error) {
            Alert.alert('Erro ao entrar', (error as Error).message || 'Erro ao fazer login.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    },
    [login],
    );
    
    return { execute, loading };
}