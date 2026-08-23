import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { EnderecoCard } from '../../src/components/conta/EnderecoCard';
import { SubtotalCard } from '../../src/components/carrinho/SubtotalCard';
import { Footer } from '../../src/components/layout/Footer';
import { Header } from '../../src/components/layout/Header';
import { Icon } from '../../src/components/layout/Icon';
import { useGetCarrinho } from '../../src/hooks/carrinho/useGetCarrinho';
import { useGetEnderecos } from '../../src/hooks/conta/useGetEnderecos';
import { useCreateCheckout } from '../../src/hooks/pedido/useCreateCheckout';
import { useCreatePedido } from '../../src/hooks/pedido/useCreatePedido';

export default function CheckoutScreen() {
  const { execute: fetchEnderecos, enderecos, loading: carregandoEnderecos } = useGetEnderecos();
  const { execute: fetchCarrinho, carrinho } = useGetCarrinho();
  const { execute: criarPedido, loading: criandoPedido } = useCreatePedido();
  const { execute: criarCheckout, loading: abrindoPagamento } = useCreateCheckout();

  const [idEnderecoSelecionado, setIdEnderecoSelecionado] = useState<number | null>(null);

  useEffect(() => {
    fetchEnderecos();
    fetchCarrinho();
  }, [fetchEnderecos, fetchCarrinho]);

  const finalizando = criandoPedido || abrindoPagamento;

  const handleSelecionarEndereco = async (idEndereco: number) => {
    setIdEnderecoSelecionado(idEndereco);

    const resPedido = await criarPedido(idEndereco);
    if (!resPedido.success || !resPedido.idPedido) {
      setIdEnderecoSelecionado(null);
      return;
    }

    await criarCheckout(resPedido.idPedido);
    setIdEnderecoSelecionado(null);
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }} stickyHeaderIndices={[0]}>
      <Header />

      <View className="flex-1 gap-6 p-6">
        <Text className="text-3xl font-bold">Finalizar Pedido</Text>

        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <View className="gap-0.5">
              <View className="flex-row items-center gap-2">
                <Icon name="location-dot" size={14} color="#7929c8" />
                <Text className="font-semibold text-gray-800">Escolha o endereço de entrega</Text>
              </View>
              <Text className="pl-5 text-xs text-gray-400">O pedido será confirmado ao tocar no endereço</Text>
            </View>
            <Pressable onPress={() => router.push('/endereco/novo')} className="flex-row items-center gap-1">
              <Icon name="plus" size={12} color="#7929c8" />
              <Text className="text-sm font-semibold text-purple-700">Novo</Text>
            </Pressable>
          </View>

          {carregandoEnderecos ? (
            <ActivityIndicator color="#7929c8" />
          ) : enderecos.length === 0 ? (
            <View className="items-center gap-1 rounded-2xl border-2 border-dashed border-gray-200 p-4">
              <Text className="text-sm text-gray-400">Nenhum endereço cadastrado.</Text>
              <Pressable onPress={() => router.push('/endereco/novo')}>
                <Text className="text-sm font-semibold text-purple-700">Adicionar endereço</Text>
              </Pressable>
            </View>
          ) : (
            <View className="gap-2">
              {enderecos.map((e) => (
                <EnderecoCard
                  key={e.id_endereco}
                  endereco={e}
                  selected={idEnderecoSelecionado === e.id_endereco}
                  onPress={() => !finalizando && handleSelecionarEndereco(e.id_endereco)}
                />
              ))}
            </View>
          )}

          {finalizando && (
            <Text className="text-center text-xs font-semibold text-purple-700">Finalizando...</Text>
          )}
        </View>

        <SubtotalCard carrinho={carrinho} />
      </View>

      <Footer />
    </ScrollView>
  );
}
