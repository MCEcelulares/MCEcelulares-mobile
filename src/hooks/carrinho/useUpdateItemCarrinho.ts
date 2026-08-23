import { useCallback, useState } from 'react';
import { updateItemCarrinhoAPI } from '../../actions/carrinho';
import { useAuth } from '../../contexts/AuthContext';

export function useUpdateItemCarrinho() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(
    async (id_item_carrinho: number, quantidade: number) => {
      setLoading(true);
      try {
        const data = await updateItemCarrinhoAPI(token!, id_item_carrinho, quantidade);
        return { success: data.success };
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return { execute, loading };
}
