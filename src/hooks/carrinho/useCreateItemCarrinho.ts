import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { createCarrinhoAPI, createItemCarrinhoAPI } from '../../actions/carrinho';
import { useAuth } from '../../contexts/AuthContext';

export function useCreateItemCarrinho() {
  const [loading, setLoading] = useState(false);
  const { token, isAuthenticated } = useAuth();

  const execute = useCallback(
    async (id_produto: number) => {
      if (!isAuthenticated) {
        router.push('/login');
        return { success: false };
      }

      setLoading(true);
      try {
        const dataCarrinho = await createCarrinhoAPI(token!);
        if (!dataCarrinho.success) throw new Error(dataCarrinho.error);

        const dataItem = await createItemCarrinhoAPI(token!, dataCarrinho.id_carrinho, id_produto);
        if (!dataItem.success) throw new Error(dataItem.error);

        return { success: true };
      } catch (error) {
        Alert.alert('Erro ao adicionar ao carrinho', (error as Error).message || 'Não foi possível adicionar o item');
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [token, isAuthenticated],
  );

  return { execute, loading };
}
