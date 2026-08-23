import { ProdutoType } from './produto';

export type CarrinhoType = {
  id_carrinho: number;
  id_usuario: number;
  data_criacao: string;
  ativo: boolean;
};

export type ItemCarrinhoType = {
  id_item_carrinho: number;
  id_carrinho: number;
  id_produto: number;
  preco_unitario: number;
  quantidade: number;
  produto: ProdutoType;
};
