import * as Linking from 'expo-linking';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { createCheckoutAPI } from '../../actions/pedido';
import { useAuth } from '../../contexts/AuthContext';

export function useCreateCheckout() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(
    async (idPedido: number) => {
      setLoading(true);
      try {
        if (!token) throw new Error('Você deve fazer login para pagar o pedido');
        const data = await createCheckoutAPI(token, idPedido);
        if (!data.success) throw new Error(data.error);

        await Linking.openURL(data.checkoutUrl);
        return { success: true };
      } catch (error) {
        Alert.alert('Erro ao abrir pagamento', (error as Error).message || 'Não foi possível iniciar o pagamento');
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return { execute, loading };
}
