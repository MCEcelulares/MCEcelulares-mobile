import { useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Text, View } from 'react-native';
import { useGetProdutos } from '../../hooks/produto/useGetProdutos';
import { Icon } from '../layout/Icon';
import { ProdutoCard } from './ProdutoCard';

const SCREEN_WIDTH = Dimensions.get('window').width;
// Mostra ~1.3 card por vez, com um pedaço do próximo "espiando" na lateral —
// mesmo efeito do slidesToShow responsivo do carousel no site.
const CARD_WIDTH = SCREEN_WIDTH * 0.62;
const GAP = 12;

type ProdutoCarouselProps = {
  destaque?: boolean;
};

export const ProdutoCarousel = ({ destaque }: ProdutoCarouselProps) => {
  const { execute, produtos, loading, error } = useGetProdutos();

  useEffect(() => {
    execute(undefined, undefined, undefined, destaque, true);
  }, [execute, destaque]);

  if (loading) {
    return (
      <View className="items-center py-10">
        <ActivityIndicator color="#7929c8" />
        <Text className="mt-2 text-sm font-medium text-gray-400">Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center py-10">
        <Text className="text-sm font-medium text-red-600">{error}</Text>
      </View>
    );
  }

  if (produtos.length === 0) {
    return (
      <View className="items-center gap-3 py-16">
        <Icon name="mobile-screen" size={28} color="#9ca3af" />
        <Text className="text-sm font-medium text-gray-400">Nenhum produto encontrado.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={produtos}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => String(item.id_produto)}
      snapToInterval={CARD_WIDTH + GAP}
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: 16, gap: GAP }}
      renderItem={({ item }) => <ProdutoCard produto={item} width={CARD_WIDTH} />}
    />
  );
};
