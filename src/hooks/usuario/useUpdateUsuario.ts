import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { updateUsuarioAPI } from '../../actions/usuario';
import { useAuth } from '../../contexts/AuthContext';

type UpdateUsuarioInput = {
  nome: string;
  telefone: string;
};

export function useUpdateUsuario() {
  const [loading, setLoading] = useState(false);
  const { token, updateNome } = useAuth();

  const execute = useCallback(
    async (input: UpdateUsuarioInput) => {
      setLoading(true);
      try {
        if (!token) throw new Error('Você deve fazer login para atualizar sua conta');
        const data = await updateUsuarioAPI(token, input);
        if (!data.success) throw new Error(data.error);

        updateNome(input.nome);
        return { success: true };
      } catch (error) {
        Alert.alert('Erro ao atualizar perfil', (error as Error).message || 'Não foi possível atualizar os dados');
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [token, updateNome],
  );

  return { execute, loading };
}
