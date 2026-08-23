import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Pressable, Text, View } from 'react-native';
import { Footer } from '../../src/components/layout/Footer';
import { Header } from '../../src/components/layout/Header';
import { Icon } from '../../src/components/layout/Icon';
import { CategoriaDropdown } from '../../src/components/produtos/CategoriaDropdown';
import { MarcaDropdown } from '../../src/components/produtos/MarcaDropdown';
import { ProdutoCard } from '../../src/components/produtos/ProdutoCard';
import { useGetProdutos } from '../../src/hooks/produto/useGetProdutos';

const screenWidth = Dimensions.get('window').width;

const cardWidth = (screenWidth - 16 * 2 - 12) / 2;

const idCategoriaCelulares = '1';

export default function ProdutosScreen() {
  const { execute, produtos, loading, error, totalPages } = useGetProdutos();
  const [currentPage, setCurrentPage] = useState(1);
  const [idCategoria, setIdCategoria] = useState('');
  const [idMarca, setIdMarca] = useState('');

  const mostrarFiltroMarca = idCategoria === '' || idCategoria === idCategoriaCelulares;

  const handleCategoriaChange = useCallback((value: string) => {
    setIdCategoria(value);
    setIdMarca('');
    setCurrentPage(1);
  }, []);

  const handleMarcaChange = useCallback((value: string) => {
    setIdMarca(value);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    execute(currentPage, idCategoria || undefined, idMarca || undefined, undefined, true);
  }, [currentPage, idCategoria, idMarca, execute]);

  return (
    <FlatList
      className="flex-1 bg-white"
      data={produtos}
      numColumns={2}
      keyExtractor={(item) => String(item.id_produto)}
      columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
      contentContainerStyle={{ gap: 12, flexGrow: 1 }}
      renderItem={({ item }) => <ProdutoCard produto={item} width={cardWidth} />}
      ListHeaderComponent={
        <>
          <Header />
          <View className="flex-row justify-center gap-3 px-4 py-5">
            <CategoriaDropdown value={idCategoria} onChange={handleCategoriaChange} ativo />
            {mostrarFiltroMarca && (
              <MarcaDropdown value={idMarca} onChange={handleMarcaChange} id_categoria={idCategoria} ativo />
            )}
          </View>

          {loading && (
            <View className="items-center py-10">
              <ActivityIndicator color="#7929c8" />
              <Text className="mt-2 text-sm font-medium text-gray-400">Carregando produtos...</Text>
            </View>
          )}

          {!loading && error && (
            <View className="items-center py-10">
              <Text className="text-sm font-medium text-red-600">{error}</Text>
            </View>
          )}

          {!loading && !error && produtos.length === 0 && (
            <View className="items-center gap-3 py-16">
              <Icon name="mobile-screen" size={28} color="#9ca3af" />
              <Text className="text-sm font-medium text-gray-400">Nenhum produto encontrado.</Text>
            </View>
          )}
        </>
      }
      ListFooterComponent={
        <>
          {!loading && totalPages > 1 && (
            <View className="flex-row items-center justify-center gap-6 py-8">
              <Pressable
                disabled={currentPage === 1}
                onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="disabled:opacity-30"
              >
                <Icon name="chevron-left" size={16} color="#6a1fd0" />
              </Pressable>

              <Text className="text-sm font-medium text-gray-600">
                Página {currentPage} de {totalPages}
              </Text>

              <Pressable
                disabled={currentPage === totalPages}
                onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="disabled:opacity-30"
              >
                <Icon name="chevron-right" size={16} color="#6a1fd0" />
              </Pressable>
            </View>
          )}
          <Footer />
        </>
      }
    />
  );
}
