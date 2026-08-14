import { Text, View } from 'react-native';
import { ProdutoCarousel } from '../produtos/ProdutoCarousel';

type ProdutoSectionProps = {
  title: string;
  destaque?: boolean;
};


export const ProdutoSection = ({ title, destaque }: ProdutoSectionProps) => {
  return (
    <View className="mb-4">
      <Text className="mb-4 text-center text-2xl font-bold">{title}</Text>
      <ProdutoCarousel destaque={destaque} />
    </View>
  );
};
