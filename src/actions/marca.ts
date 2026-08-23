import { API_URL } from '../lib/api';
import { fetchAuth } from '../lib/fetchAuth';
import { MarcaType } from '../types/marca';

type GetMarcasInput = {
  id_categoria?: number;
  ativo?: boolean;
};

export async function getMarcasAPI(input: GetMarcasInput) {
  try {
    const params = new URLSearchParams();
    if (input.id_categoria !== undefined) params.set('id_categoria', String(input.id_categoria));
    if (input.ativo !== undefined) params.set('ativo', String(input.ativo));

    const response = await fetchAuth(`${API_URL}/marca?${params}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const, marcas: data as MarcaType[] };
  } catch (error) {
    return {
      success: false as const,
      error: (error as Error).message || 'Servidor indisponível no momento.',
    };
  }
}
