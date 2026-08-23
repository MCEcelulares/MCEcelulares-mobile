import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { deleteEnderecoAPI } from '../../actions/endereco';
import { useAuth } from '../../contexts/AuthContext';

function confirmarRemocao(): Promise<boolean> {
  return new Promise((resolve) => {
    Alert.alert(
      'Remover endereço?',
      'Esta ação não poderá ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Sim, remover', style: 'destructive', onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) },
    );
  });
}

export function useDeleteEndereco() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(
    async (id_endereco: number) => {
      const confirmado = await confirmarRemocao();
      if (!confirmado) return { success: false };

      setLoading(true);
      try {
        if (!token) throw new Error('Você deve fazer login para remover um endereço');
        const data = await deleteEnderecoAPI(token, id_endereco);
        if (!data.success) throw new Error(data.error);

        return { success: true };
      } catch (error) {
        Alert.alert('Erro ao remover endereço', (error as Error).message || 'Não foi possível remover o endereço');
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return { execute, loading };
}
