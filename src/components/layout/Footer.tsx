import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon } from './Icon';

const WHATSAPP_URL = 'https://wa.me/554599457149';
const INSTAGRAM_URL = 'https://www.instagram.com/mcecelulares';
const MAPS_URL = 'https://maps.app.goo.gl/noykfqR7HGqMM55DA';

export const Footer = () => {
  return (
    <LinearGradient colors={['#5714d7', '#7929c8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="px-6 py-6">
      <View className="flex-row justify-center gap-4">
        <Pressable onPress={() => Linking.openURL(WHATSAPP_URL)} className="rounded-full bg-white p-2">
          <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
        </Pressable>
        <Pressable onPress={() => Linking.openURL(INSTAGRAM_URL)} className="rounded-full bg-white p-2">
          <Ionicons name="logo-instagram" size={20} color="#E4405F" />
        </Pressable>
      </View>

      <View className="my-4 items-center">
        <Image
          source={require('../../../assets/images/logo-mcecelulares.png')}
          className="h-10 w-[160px]"
          resizeMode="contain"
        />
        <Text className="mt-2 text-xs text-white">© {new Date().getFullYear()} Todos os direitos reservados</Text>
      </View>

      <Pressable onPress={() => Linking.openURL(MAPS_URL)} className="items-center">
        <View className="flex-row items-center gap-2">
          <Icon name="location-dot" size={14} />
          <Text className="text-xs font-semibold uppercase text-white">Rua Minas Gerais - 37</Text>
        </View>
        <Text className="text-xs text-white">85420-000 / Centro, Corbélia - PR</Text>
        <Text className="mt-1 text-xs text-white underline">(45) 99945-7149</Text>
      </Pressable>
    </LinearGradient>
  );
};
