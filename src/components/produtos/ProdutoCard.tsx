import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../layout/Button';

const PLACEHOLDER_IMG = 'https://placehold.co/200x200/e5e7eb/9ca3af/png?text=Sem+imagem';

const formatPreco = (preco: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(preco));

type ProdutoCardProps = {
  produto: ProdutoType;
  width: number;
};

// Réplica do card do site: borda roxa, imagem, nome (2 linhas), preço e
// botão de adicionar. Ver Frontend/src/components/produtos/ProdutoCard.tsx
export const ProdutoCard = ({ produto, width }: ProdutoCardProps) => {
  const { isAuthenticated } = useAuth();

  const handleAdd = () => {
    if (!isAuthenticated) return router.push('/login');
    // TODO: plugar useCreateItemCarrinho quando a tela de carrinho for feita
    router.push('/carrinho');
  };

  return (
    <View style={{ width }} className="overflow-hidden rounded-[23px] border-2 border-purple-800 bg-white">
      <View
        onTouchEnd={() => router.push(`/produtos/detalhes?id=${produto.id_produto}`)}
        className="h-[140px] items-center justify-center bg-[#E5E7EB] p-4"
      >
        <Image
          source={{ uri: produto.imagem ?? PLACEHOLDER_IMG }}
          className="h-full w-full"
          resizeMode="contain"
        />
      </View>

      <View className="items-center gap-1 p-4">
        <Text numberOfLines={2} className="min-h-[44px] text-center text-base font-semibold text-black">
          {produto.nome}
        </Text>
        <Text className="mb-1 text-lg font-semibold text-purple-800">{formatPreco(produto.preco)}</Text>

        <Button text="Adicionar" icon="cart-shopping" onPress={handleAdd} />
      </View>
    </View>
  );
};
