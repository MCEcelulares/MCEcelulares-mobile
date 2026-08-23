import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { Footer } from '../src/components/layout/Footer';
import { Header } from '../src/components/layout/Header';
import { Icon } from '../src/components/layout/Icon';
import { PedidoCard } from '../src/components/pedidos/PedidoCard';
import { useGetPedidos } from '../src/hooks/pedido/useGetPedidos';

export default function PedidosScreen() {
  const { execute, pedidos, loading, error, totalPages } = useGetPedidos();
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    execute(pagina);
  }, [pagina, execute]);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }} stickyHeaderIndices={[0]}>
      <Header />

      <View className="flex-1 gap-6 p-6">
        <Text className="text-3xl font-bold">Meus Pedidos</Text>

        <View className="gap-4 rounded-[32px] bg-gray-200 p-6">
          <View className="flex-row items-center gap-2">
            <Icon name="box-open" size={16} color="#7929c8" />
            <Text className="text-lg font-bold text-zinc-900">Histórico de pedidos</Text>
          </View>

          {loading ? (
            <ActivityIndicator color="#7929c8" />
          ) : error ? (
            <Text className="text-sm text-red-600">{error}</Text>
          ) : pedidos.length === 0 ? (
            <Text className="text-sm text-gray-400">Você ainda não fez nenhum pedido.</Text>
          ) : (
            <View className="gap-3">
              {pedidos.map((pedido) => (
                <PedidoCard key={pedido.id_pedido} pedido={pedido} />
              ))}
            </View>
          )}

          {!loading && totalPages > 1 && (
            <View className="flex-row items-center justify-center gap-6 pt-2">
              <Pressable disabled={pagina === 1} onPress={() => setPagina((p) => p - 1)} className="disabled:opacity-30">
                <Icon name="chevron-left" size={14} color="#6a1fd0" />
              </Pressable>
              <Text className="text-sm font-medium text-gray-600">
                Página {pagina} de {totalPages}
              </Text>
              <Pressable
                disabled={pagina === totalPages}
                onPress={() => setPagina((p) => p + 1)}
                className="disabled:opacity-30"
              >
                <Icon name="chevron-right" size={14} color="#6a1fd0" />
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}
