import { ScrollView, View } from 'react-native';
import { Header } from '../src/components/layout/Header';
import { Footer } from '../src/components/layout/Footer';
import { ProdutoSection } from '../src/components/home/ProdutoSection';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }} stickyHeaderIndices={[0]}>
      <Header />
      <View className="flex-1">
        <ProdutoSection title="Destaques" destaque />
        <ProdutoSection title="Novos produtos" />
      </View>
      <Footer />
    </ScrollView>
  );
}
