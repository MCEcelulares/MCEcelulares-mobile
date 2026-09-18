import { ScrollView, View } from 'react-native';
import { Header } from '../src/components/layout/Header';
import { Footer } from '../src/components/layout/Footer';
import { ProdutoSection } from '../src/components/home/ProdutoSection';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <Header />
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 pt-6">
          <ProdutoSection title="Destaques" destaque />
          <ProdutoSection title="Novos produtos" />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}