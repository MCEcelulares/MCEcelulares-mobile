import { API_URL } from '../lib/api';
import { fetchAuth } from '../lib/fetchAuth';
import { CarrinhoType, ItemCarrinhoType } from '../types/carrinho';

export async function createCarrinhoAPI(token: string) {
  try {
    const response = await fetchAuth(`${API_URL}/carrinho`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const, id_carrinho: data.id_carrinho as number };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function getCarrinhoAPI(token: string) {
  try {
    const response = await fetchAuth(`${API_URL}/carrinho/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.status === 204 ? null : await response.json();
    if (!response.ok) throw new Error('Carrinho não encontrado');

    return { success: true as const, carrinho: data as (CarrinhoType & { itens: ItemCarrinhoType[] }) | null };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function createItemCarrinhoAPI(token: string, id_carrinho: number, id_produto: number) {
  try {
    const response = await fetchAuth(`${API_URL}/itemcarrinho`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id_carrinho, id_produto }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function updateItemCarrinhoAPI(token: string, id_item_carrinho: number, quantidade: number) {
  try {
    const response = await fetchAuth(`${API_URL}/itemcarrinho/${id_item_carrinho}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ quantidade }),
    });
    if (response.status === 204) return { success: true as const };

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function deleteItemCarrinhoAPI(token: string, id_item_carrinho: number) {
  try {
    const response = await fetchAuth(`${API_URL}/itemcarrinho/${id_item_carrinho}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.status === 204 ? null : await response.json();
    if (!response.ok) throw new Error(data?.message);

    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}
