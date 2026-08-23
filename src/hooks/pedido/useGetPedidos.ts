import { useCallback, useState } from 'react';
import { getPedidosAPI } from '../../actions/pedido';
import { useAuth } from '../../contexts/AuthContext';
import { PedidoType } from '../../types/pedido';

export function useGetPedidos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useAuth();

  const execute = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      try {
        if (!token) throw new Error('Você deve fazer login para ver seus pedidos');
        const data = await getPedidosAPI(token, page);
        if (!data.success) throw new Error(data.error);

        setPedidos(data.pedidos);
        setTotalPages(data.totalPages);
        setError(null);
        return { success: true };
      } catch (err) {
        setError((err as Error).message || 'Erro ao buscar pedidos');
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return { execute, loading, error, pedidos, totalPages };
}
