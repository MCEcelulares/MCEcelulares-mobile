import { useCallback, useState } from 'react';
import { getUsuarioAPI } from '../../actions/usuario';
import { useAuth } from '../../contexts/AuthContext';
import { UsuarioType } from '../../types/usuario';

export function useGetUsuario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const { token } = useAuth();

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) throw new Error('Você deve fazer login para acessar sua conta');
      const data = await getUsuarioAPI(token);
      if (!data.success) throw new Error(data.error);

      setUsuario(data.usuario);
      setError(null);
      return { success: true };
    } catch (err) {
      setError((err as Error).message || 'Erro ao acessar conta');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error, usuario };
}
