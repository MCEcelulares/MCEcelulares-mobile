import { useCallback, useState } from 'react';
import { deleteItemCarrinhoAPI } from '../../actions/carrinho';
import { useAuth } from '../../contexts/AuthContext';

export function useDeleteItemCarrinho() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(
    async (id_item_carrinho: number) => {
      setLoading(true);
      try {
        const data = await deleteItemCarrinhoAPI(token!, id_item_carrinho);
        return { success: data.success };
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return { execute, loading };
}
