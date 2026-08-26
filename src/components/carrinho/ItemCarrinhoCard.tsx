import { Image, Pressable, Text, View } from 'react-native';
import { useDeleteItemCarrinho } from '../../hooks/carrinho/useDeleteItemCarrinho';
import { useUpdateItemCarrinho } from '../../hooks/carrinho/useUpdateItemCarrinho';
import { ItemCarrinhoType } from '../../types/carrinho';
import { Icon } from '../layout/Icon';

const placeholderImg = 'https://placehold.co/100x100/e5e7eb/9ca3af/png?text=Sem+imagem';

const formatarPreco = (preco: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(preco));

type ItemCarrinhoCardProps = {
  item: ItemCarrinhoType;
  onUpdate: () => void;
};

export const ItemCarrinhoCard = ({ item, onUpdate }: ItemCarrinhoCardProps) => {
  const { execute: update, loading: alterando } = useUpdateItemCarrinho();
  const { execute: remove, loading: removendo } = useDeleteItemCarrinho();

  const semEstoque = item.produto.estoque === 0;

  const handleUpdate = async (delta: number) => {
    const res = await update(item.id_item_carrinho, delta);
    if (res.success) onUpdate();
  };

  const handleRemove = async () => {
    const res = await remove(item.id_item_carrinho);
    if (res.success) onUpdate();
  };

  return (
    <View className="gap-2 rounded-3xl border border-gray-100 bg-white p-4">
      <View className="flex-row items-center gap-4">
        <View className="h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <Image
            source={{ uri: item.produto.imagem ?? placeholderImg }}
            className="h-full w-full"
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 gap-1">
          <Text numberOfLines={2} className="font-bold text-black">
            {item.produto?.nome ?? 'Produto'}
          </Text>
          {semEstoque && <Text className="text-xs font-semibold text-red-600">Sem estoque no momento</Text>}
        </View>

        <Pressable onPress={handleRemove} disabled={removendo} hitSlop={8}>
          <Icon name="trash" size={16} color="#ff5c8a" />
        </Pressable>
      </View>

      <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => handleUpdate(-1)} disabled={alterando || item.quantidade <= 1} hitSlop={8}>
            <Icon name="minus" size={14} color={item.quantidade > 1 ? '#5714d7' : '#9ca3af'} />
          </Pressable>
          <Text className="font-bold text-black">{item.quantidade}</Text>
          <Pressable onPress={() => handleUpdate(1)} disabled={alterando} hitSlop={8}>
            <Icon name="plus" size={14} color="#5714d7" />
          </Pressable>
        </View>

        <Text className="font-bold text-purple-700">{formatarPreco(item.preco_unitario)}</Text>
      </View>
    </View>
  );
};
