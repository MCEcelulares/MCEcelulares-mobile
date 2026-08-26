import { Text, View } from 'react-native';
import { ItemCarrinhoType } from '../../types/carrinho';

type SubtotalCardProps = {
  carrinho: ItemCarrinhoType[];
};

export const SubtotalCard = ({ carrinho }: SubtotalCardProps) => {
  const subtotal = carrinho.reduce((acc, item) => acc + item.preco_unitario * item.quantidade, 0);

  return (
    <View className="gap-3 rounded-3xl bg-gray-200 p-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-gray-600">Subtotal</Text>
        <Text className="font-semibold text-black">R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-base text-gray-600">Frete</Text>
        <Text className="font-semibold text-green-600">Grátis</Text>
      </View>

      <View className="flex-row items-center justify-between border-t border-gray-300 pt-3">
        <Text className="text-lg font-bold text-black">Total</Text>
        <Text className="text-xl font-bold text-purple-700">R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
      </View>
    </View>
  );
};
