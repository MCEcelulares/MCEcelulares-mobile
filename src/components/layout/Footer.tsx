import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { Image, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WHATSAPP_URL = 'https://wa.me/554599457149';
const INSTAGRAM_URL = 'https://www.instagram.com/mcecelulares';

export const Footer = () => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#5714d7', '#7929c8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ paddingBottom: insets.bottom + 12 }}
      className="items-center gap-3 px-6 pt-5"
    >
      <Image
        source={require('../../../assets/images/logo-mcecelulares.png')}
        className="h-8 w-[130px]"
        resizeMode="contain"
      />

      <View className="flex-row gap-3">
        <Pressable onPress={() => Linking.openURL(WHATSAPP_URL)} className="rounded-full bg-white p-2">
          <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
        </Pressable>
        <Pressable onPress={() => Linking.openURL(INSTAGRAM_URL)} className="rounded-full bg-white p-2">
          <Ionicons name="logo-instagram" size={18} color="#E4405F" />
        </Pressable>
      </View>
    </LinearGradient>
  );
};
