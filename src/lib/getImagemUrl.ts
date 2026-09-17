import { API_URL } from './api';

export const IMAGEM_PADRAO = 'https://placehold.co/200x200/e5e7eb/9ca3af/png?text=Sem+imagem';

export function getImagemUrl(imagem?: string | null): string {
  if (!imagem) return IMAGEM_PADRAO;
  if (imagem.startsWith('http://') || imagem.startsWith('https://')) return imagem;

  return `${API_URL}${imagem.startsWith('/') ? '' : '/'}${imagem}`;
}