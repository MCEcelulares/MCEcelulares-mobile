import { useCallback, useState } from 'react';
import { getCarrinhoAPI } from '../../actions/carrinho';
import { useAuth } from '../../contexts/AuthContext';
import { ItemCarrinhoType } from '../../types/carrinho';

export function useGetCarrinho() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carrinho, setCarrinho] = useState<ItemCarrinhoType[]>([]);
  const { token } = useAuth();

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) throw new Error('Você deve fazer login para ver seu carrinho');
      const data = await getCarrinhoAPI(token);
      if (!data.success) throw new Error(data.error);

      setCarrinho(data.carrinho?.itens ?? []);
      setError(null);
      return { success: true };
    } catch (err) {
      setError((err as Error).message || 'Erro ao buscar carrinho');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error, carrinho };
}
