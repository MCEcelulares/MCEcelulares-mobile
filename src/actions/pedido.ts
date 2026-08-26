import { API_URL } from '../lib/api';
import { fetchAuth } from '../lib/fetchAuth';
import { PedidoType } from '../types/pedido';

export async function createPedidoAPI(token: string, id_endereco: number) {
  try {
    const response = await fetchAuth(`${API_URL}/pedido`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id_endereco }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const, pedido: data as PedidoType };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function createCheckoutAPI(token: string, id_pedido: number) {
  try {
    const response = await fetchAuth(`${API_URL}/pedido/${id_pedido}/checkout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const, checkoutUrl: data.checkout_url as string };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function getPedidosAPI(token: string, page: number) {
  try {
    const response = await fetchAuth(`${API_URL}/pedido?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return {
      success: true as const,
      pedidos: data.data as PedidoType[],
      total: data.total as number,
      totalPages: data.totalPages as number,
    };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}
