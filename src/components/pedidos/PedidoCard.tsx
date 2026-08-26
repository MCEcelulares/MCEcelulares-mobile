import { Pressable, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Icon } from '../layout/Icon';
import { useCreateCheckout } from '../../hooks/pedido/useCreateCheckout';
import { PedidoType, StatusPedido } from '../../types/pedido';

// Mesmos status e cores do site — não mexi nos valores possíveis, só
// troquei as classes Tailwind de fundo/texto pra web por cores diretas
// (bg-*/text-* do NativeWind funcionam igual, mantive a mesma paleta).
const statusLabels: Record<StatusPedido, string> = {
  AGUARDANDO_PAGAMENTO: 'Aguardando Pagamento',
  PAGO: 'Pago',
  ENVIADO: 'Enviado',
  ENTREGUE: 'Entregue',
  CANCELADO: 'Cancelado',
};

const statusStyles: Record<StatusPedido, string> = {
  AGUARDANDO_PAGAMENTO: 'bg-yellow-100 text-yellow-700',
  PAGO: 'bg-blue-100 text-blue-700',
  ENVIADO: 'bg-indigo-100 text-indigo-700',
  ENTREGUE: 'bg-green-100 text-green-700',
  CANCELADO: 'bg-red-100 text-red-700',
};

type PedidoCardProps = {
  pedido: PedidoType;
};

export const PedidoCard = ({ pedido }: PedidoCardProps) => {
  const { execute: criarCheckout, loading } = useCreateCheckout();

  const status = pedido.status ?? 'AGUARDANDO_PAGAMENTO';
  const statusLabel = statusLabels[status] ?? pedido.status ?? 'Em andamento';
  const [bgClass, textClass] = (statusStyles[status] ?? 'bg-gray-100 text-gray-700').split(' ');

  return (
    <View className="gap-3 rounded-3xl border border-gray-100 bg-white p-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-bold text-gray-900">Pedido #{pedido.id_pedido}</Text>
        <Text className={`rounded-full px-3 py-1 text-xs font-semibold ${bgClass} ${textClass}`}>{statusLabel}</Text>
      </View>

      {pedido.enderecoPedido && (
        <View className="flex-row items-start gap-2">
          <Icon name="location-dot" size={12} color="#7929c8" />
          <Text className="flex-1 text-xs text-gray-500">
            {pedido.enderecoPedido.endereco}, {pedido.enderecoPedido.numero} — {pedido.enderecoPedido.cidade}/
            {pedido.enderecoPedido.estado}
          </Text>
        </View>
      )}

      {pedido.itens?.length > 0 && (
        <View className="gap-1">
          {pedido.itens.map((item, index) => (
            <View key={item.id_item_pedido || `item-${index}`} className="flex-row justify-between">
              <Text className="text-xs text-gray-600">
                {item.quantidade}x {item.nome_produto}
              </Text>
              <Text className="text-xs text-gray-600">R$ {Number(item.preco_unitario).toFixed(2).replace('.', ',')}</Text>
            </View>
          ))}
        </View>
      )}

      <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
        <Text className="text-xs text-gray-400">
          {new Date(pedido.data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text className="font-bold text-purple-700">R$ {Number(pedido.valor_total).toFixed(2).replace('.', ',')}</Text>
      </View>

      {status === 'AGUARDANDO_PAGAMENTO' && (
        <Pressable
          onPress={() => criarCheckout(pedido.id_pedido)}
          disabled={loading}
          style={{ borderRadius: 999 }}
          className="flex-row items-center justify-center gap-2 bg-purple-50 py-2.5 disabled:opacity-60"
        >
          {loading ? (
            <ActivityIndicator color="#7929c8" size="small" />
          ) : (
            <>
              <Icon name="credit-card" size={14} color="#7929c8" />
              <Text className="text-xs font-semibold text-purple-700">Finalizar pagamento</Text>
            </>
          )}
        </Pressable>
      )}
    </View>
  );
};
