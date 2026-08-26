export type StatusPedido = 'AGUARDANDO_PAGAMENTO' | 'PAGO' | 'ENVIADO' | 'ENTREGUE' | 'CANCELADO';

export type ItemPedidoType = {
  id_item_pedido: number;
  id_pedido: number;
  id_produto: number;
  nome_produto: string;
  quantidade: number;
  preco_unitario: number;
};

export type UsuarioPedidoType = {
  id_usuario_pedido: number;
  id_usuario: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
};

export type EnderecoPedidoType = {
  id_endereco_pedido: number;
  id_endereco: number;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export type PedidoType = {
  id_pedido: number;
  valor_total: number;
  status: StatusPedido;
  ativo: boolean;
  data: string;
  usuarioPedido: UsuarioPedidoType;
  enderecoPedido: EnderecoPedidoType;
  itens: ItemPedidoType[];
};
