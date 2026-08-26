import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { createEnderecoAPI } from '../../actions/endereco';
import { useAuth } from '../../contexts/AuthContext';

type CreateEnderecoInput = {
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export function useCreateEndereco() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(
    async (input: CreateEnderecoInput) => {
      setLoading(true);
      try {
        if (!token) throw new Error('Você deve fazer login para cadastrar um endereço');
        const data = await createEnderecoAPI(token, input);
        if (!data.success) throw new Error(data.error);

        return { success: true };
      } catch (error) {
        Alert.alert('Erro ao cadastrar endereço', (error as Error).message || 'Não foi possível cadastrar o endereço');
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return { execute, loading };
}
