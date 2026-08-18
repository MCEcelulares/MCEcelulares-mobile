import { ScrollView, Text, View } from 'react-native';
import { Header } from '../src/components/layout/Header';

export default function ContaScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <Header />
      <View className="flex-1 items-center justify-center py-20">
        <Text className="text-gray-400">Conta</Text>
      </View>
    </ScrollView>
  );
}
