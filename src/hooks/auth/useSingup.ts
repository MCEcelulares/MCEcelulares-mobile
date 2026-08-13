import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { singupAPI } from '../../actions/auth';


type SingupInput = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    telefone: string;
};

export function useSingup() {
    const [loading, setLoading] = useState(false);

    const execute = useCallback(async (input: SingupInput) => {
        setLoading(true);
        try {
            const data = await singupAPI(input);
            if (!data.success) throw new Error(data.error);

            Alert.alert('Cadastro realizado com sucesso!', 'Agora faça o login para utilizar sua conta.');
            return { success: true };
        } catch (error) {
            Alert.alert('Erro ao cadastrar', (error as Error).message || 'Erro ao realizar cadastro.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    }, []);

    return { execute, loading };
}