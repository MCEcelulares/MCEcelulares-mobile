import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { contatoAPI } from '../../actions/contato';

type ContatoInput = {
    nome: string;
    telefone: string;
    email: string;
    assunto: string;
    mensagem: string;
};

export function useSendEmail() {
    const [loading, setLoading] = useState(false);

    const execute = useCallback(async (input: ContatoInput) => {
        setLoading(true);
        try {
            const data = await contatoAPI(input);
            if (!data.success) throw new Error(data.error);

            Alert.alert('Mensagem enviada!', 'Entraremos em contato em breve.');
            return { success: true as const };
        } catch (error) {
            Alert.alert('Erro ao enviar', (error as Error).message || 'Não foi possível enviar email.');
            return { success: false as const };
        } finally {
            setLoading(false);
        }
    }, []);

    return { execute, loading };
}