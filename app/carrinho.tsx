import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Button } from '../src/components/layout/Button';
import { Footer } from '../src/components/layout/Footer';
import { Header } from '../src/components/layout/Header';
import { ItemCarrinhoCard } from '../src/components/carrinho/ItemCarrinhoCard';
import { SubtotalCard } from '../src/components/carrinho/SubtotalCard';
import { useGetCarrinho } from '../src/hooks/carrinho/useGetCarrinho';

export default function CarrinhoScreen() {
  const { execute: fetchCarrinho, loading, carrinho } = useGetCarrinho();

  useEffect(() => {
    fetchCarrinho();
  }, [fetchCarrinho]);

  const temItemSemEstoque = carrinho.some((item) => item.produto.estoque === 0);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }} stickyHeaderIndices={[0]}>
      <Header />

      <View className="flex-1 gap-6 p-6">
        <Text className="text-3xl font-bold">Meu Carrinho</Text>

        {loading && carrinho.length === 0 ? (
          <ActivityIndicator color="#7929c8" />
        ) : carrinho.length === 0 ? (
          <View className="items-center rounded-3xl border-2 border-dashed border-gray-200 p-12">
            <Text className="text-lg font-semibold text-gray-400">Seu carrinho está vazio.</Text>
          </View>
        ) : (
          <>
            <View className="gap-3">
              {carrinho.map((item) => (
                <ItemCarrinhoCard key={item.id_item_carrinho} item={item} onUpdate={fetchCarrinho} />
              ))}
            </View>

            <SubtotalCard carrinho={carrinho} />

            {temItemSemEstoque && (
              <Text className="text-center text-xs font-semibold text-red-600">
                Remova os itens sem estoque do carrinho pra conseguir finalizar o pedido.
              </Text>
            )}

            <Button
              text="Finalizar pedido"
              icon="circle-check"
              onPress={() => router.push('/carrinho/checkout')}
              disabled={loading || carrinho.length === 0 || temItemSemEstoque}
            />
          </>
        )}
      </View>

      <Footer />
    </ScrollView>
  );
}
