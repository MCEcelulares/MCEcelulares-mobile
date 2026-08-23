import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { createPedidoAPI } from '../../actions/pedido';
import { useAuth } from '../../contexts/AuthContext';

export function useCreatePedido() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(
    async (id_endereco: number) => {
      setLoading(true);
      try {
        if (!token) throw new Error('Você deve fazer login para finalizar o pedido');
        const data = await createPedidoAPI(token, id_endereco);
        if (!data.success) throw new Error(data.error);

        return { success: true, idPedido: data.pedido.id_pedido };
      } catch (error) {
        Alert.alert('Erro ao finalizar pedido', (error as Error).message || 'Não foi possível criar o pedido');
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return { execute, loading };
}
