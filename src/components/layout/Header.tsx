import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useMenu } from '../../contexts/MenuContext';
import { Icon } from './Icon';

const MAX_NOME_LENGTH = 14;

const formatNome = (nome: string) =>
  nome.length > MAX_NOME_LENGTH ? `${nome.slice(0, MAX_NOME_LENGTH).trimEnd()}...` : nome;

export const Header = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { toggle } = useMenu();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#5714d7', '#7929c8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ paddingTop: insets.top + 8 }}
      className="flex-row items-center justify-between px-4 pb-4"
    >
      <Pressable onPress={toggle} hitSlop={12} className="p-1">
        <Icon name="bars" size={22} />
      </Pressable>

      {isLoading ? (
        <View className="h-9 w-24" />
      ) : isAuthenticated ? (
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => router.push('/conta')} className="flex-row items-center gap-2">
            <Text className="max-w-[90px] text-sm font-medium text-white" numberOfLines={1}>
              {user?.nome ? formatNome(user.nome) : 'Conta'}
            </Text>
            <Icon name="circle-user" size={22} />
          </Pressable>
          <Pressable onPress={logout} hitSlop={8}>
            <Icon name="arrow-right-from-bracket" size={18} />
          </Pressable>
        </View>
      ) : (
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => router.push('/login')}
            className="rounded-full border-2 border-white bg-white px-4 py-2"
          >
            <Text className="text-sm font-semibold text-[#7929c8]">Entrar</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/cadastro')}
            className="rounded-full border-2 border-white px-4 py-2"
          >
            <Text className="text-sm font-semibold text-white">Cadastrar</Text>
          </Pressable>
        </View>
      )}
    </LinearGradient>
  );
};
