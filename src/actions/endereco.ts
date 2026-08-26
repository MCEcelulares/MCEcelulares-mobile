import { API_URL } from '../lib/api';
import { fetchAuth } from '../lib/fetchAuth';
import { EnderecoType } from '../types/endereco';

type CreateEnderecoInput = {
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export async function createEnderecoAPI(token: string, input: CreateEnderecoInput) {
  try {
    const response = await fetchAuth(`${API_URL}/endereco`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const, endereco: data as EnderecoType };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function getEnderecosAPI(token: string, id_usuario: number) {
  try {
    const response = await fetchAuth(`${API_URL}/endereco?id_usuario=${id_usuario}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true as const, enderecos: data as EnderecoType[] };
  } catch (error) {
    return { success: false as const, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function deleteEnderecoAPI(token: string, id_endereco: number) {
  try {
    const response = await fetchAuth(`${API_URL}/endereco/${id_endereco}`, {
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
