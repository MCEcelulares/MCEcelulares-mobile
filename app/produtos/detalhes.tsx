import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { Button } from '../../src/components/layout/Button';
import { Header } from '../../src/components/layout/Header';
import { useAuth } from '../../src/contexts/AuthContext';
import { useGetProduto } from '../../src/hooks/produto/useGetProduto';

const PLACEHOLDER_IMG = 'https://placehold.co/400x400/e5e7eb/9ca3af/png?text=Sem+imagem';

const formatPreco = (preco: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(preco));

export default function ProdutoDetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { execute, produto, loading, error } = useGetProduto();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) execute(Number(id));
  }, [id, execute]);

  const handleAdd = () => {
    if (!isAuthenticated) return router.push('/login');
    
    router.push('/carrinho');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Header />

      {loading && (
        <View className="items-center py-20">
          <ActivityIndicator color="#7929c8" />
        </View>
      )}

      {!loading && error && (
        <View className="items-center py-20">
          <Text className="text-sm font-medium text-red-600">{error}</Text>
        </View>
      )}

      {!loading && produto && (
        <View>
          <View className="h-[300px] items-center justify-center bg-[#E5E7EB] p-8">
            <Image
              source={{ uri: produto.imagem ?? PLACEHOLDER_IMG }}
              className="h-full w-full"
              resizeMode="contain"
            />
          </View>

          <View className="gap-3 p-6">
            <View className="flex-row gap-2">
              {produto.categoria && (
                <Text className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                  {produto.categoria.nome}
                </Text>
              )}
              {produto.marca && (
                <Text className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  {produto.marca.nome}
                </Text>
              )}
            </View>

            <Text className="text-2xl font-bold text-black">{produto.nome}</Text>
            {produto.descricao && <Text className="text-sm text-gray-500">{produto.descricao}</Text>}

            <Text className="text-3xl font-semibold text-purple-800">{formatPreco(produto.preco)}</Text>
            <Text className="text-xs text-gray-400">Em estoque: {produto.estoque}</Text>

            <View className="pt-2">
              <Button text="Adicionar ao carrinho" icon="cart-shopping" onPress={handleAdd} />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
