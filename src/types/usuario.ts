import { EnderecoType } from './endereco';

export type UsuarioType = {
  id_usuario: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  ativo: boolean;
  admin: boolean;
  enderecos?: EnderecoType[];
};
