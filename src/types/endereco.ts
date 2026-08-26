export type EnderecoType = {
  id_endereco: number;
  id_usuario: number;
  endereco: string;
  numero: string;
  complemento: string | null;
  bairro: string | null;
  cidade: string;
  estado: string;
  cep: string;
};
