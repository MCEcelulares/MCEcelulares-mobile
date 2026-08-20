import { API_URL } from '../lib/api';
import { fetchAuth } from '../lib/fetchAuth';
import { CategoriaType } from '../types/categoria';

type GetCategoriasInput = {
  ativo?: boolean;
};

export async function getCategoriasAPI(input: GetCategoriasInput) {
  try {
    const params = new URLSearchParams();
    if (input.ativo !== undefined) params.set('ativo', String(input.ativo));

    const response = await fetchAuth(`${API_URL}/categoria?${params}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const, categorias: data as CategoriaType[] };
  } catch (error) {
    return {
      success: false as const,
      error: (error as Error).message || 'Servidor indisponível no momento.',
    };
  }
}
