import { useCallback, useState } from 'react';
import { getProdutoAPI } from '../../actions/produto';
import { ProdutoType } from '../../types/produto';

export function useGetProduto() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [produto, setProduto] = useState<ProdutoType | null>(null);

  const execute = useCallback(async (id_produto: number) => {
    setLoading(true);
    try {
      const data = await getProdutoAPI(id_produto);
      if (!data.success) throw new Error(data.error);

      setProduto(data.produto);
      setError(null);
      return { success: true };
    } catch (err) {
      setError((err as Error).message || 'Erro ao buscar produto');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error, produto };
}
