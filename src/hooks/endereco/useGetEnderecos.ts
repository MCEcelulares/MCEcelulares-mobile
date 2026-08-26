import { useCallback, useState } from 'react';
import { getEnderecosAPI } from '../../actions/endereco';
import { useAuth } from '../../contexts/AuthContext';
import { EnderecoType } from '../../types/endereco';

export function useGetEnderecos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enderecos, setEnderecos] = useState<EnderecoType[]>([]);
  const { token, user } = useAuth();

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      if (!token || !user) throw new Error('Você deve fazer login para ver seus endereços');
      const data = await getEnderecosAPI(token, user.id);
      if (!data.success) throw new Error(data.error);

      setEnderecos(data.enderecos);
      setError(null);
      return { success: true };
    } catch (err) {
      setError((err as Error).message || 'Erro ao buscar endereços');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading, error, enderecos };
}
