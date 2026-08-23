import { API_URL } from '../lib/api';
import { fetchAuth } from '../lib/fetchAuth';
import { UsuarioType } from '../types/usuario';

export async function getUsuarioAPI(token: string) {
  try {
    const response = await fetchAuth(`${API_URL}/usuario/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const, usuario: data as UsuarioType };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

type UpdateUsuarioInput = {
  nome: string;
  telefone: string;
};

export async function updateUsuarioAPI(token: string, input: UpdateUsuarioInput) {
  try {
    const response = await fetchAuth(`${API_URL}/usuario/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function deleteUsuarioAPI(token: string) {
  try {
    const response = await fetchAuth(`${API_URL}/usuario/me`, {
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
