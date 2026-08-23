import { useCallback, useState } from 'react';
import { getMarcasAPI } from '../../actions/marca';
import { MarcaType } from '../../types/marca';

export function useGetMarcas() {
  const [marcas, setMarcas] = useState<MarcaType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id_categoria?: number, ativo?: boolean) => {
    setLoading(true);
    try {
      const data = await getMarcasAPI({ id_categoria, ativo });
      if (!data.success) throw new Error(data.error);

      setMarcas(data.marcas);
      setError(null);
      return { success: true };
    } catch (err) {
      setError((err as Error).message || 'Erro ao buscar marcas');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, marcas, loading, error };
}
