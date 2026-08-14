import { ScrollView } from 'react-native';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { ProdutoSection } from '../../src/components/home/ProdutoSection';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white" stickyHeaderIndices={[0]}>
      <Header />
      <ProdutoSection title="Destaques" destaque />
      <ProdutoSection title="Novos produtos" />
      <Footer />
    </ScrollView>
  );
}
