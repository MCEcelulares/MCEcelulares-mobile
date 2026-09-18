import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { Icon } from './Icon';
import { NavDrawer } from './NavDrawer';

const maxNomeLength = 14;

const formatNome = (nome: string) =>
  nome.length > maxNomeLength ? `${nome.slice(0, maxNomeLength).trimEnd()}...` : nome;

export const Header = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      <LinearGradient
        colors={['#5714d7', '#7929c8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingTop: insets.top + 4 }}
        className="flex-row items-center justify-between px-2 pb-2"
      >
        {/* Menu */}
        <Pressable
          onPress={() => {setMenuOpen(true)}}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          className="h-12 w-12 items-center justify-center rounded-full active:bg-white/20"
        >
          <Icon name="bars" size={22} />
        </Pressable>

        {isLoading ? (
          <View className="h-12 w-24" />
        ) : isAuthenticated ? (
          <View className="flex-row items-center">
            {/* Conta */}
            <Pressable
              onPress={() => router.navigate('/conta')}
              hitSlop={12}
              className="min-h-[48px] flex-row items-center gap-2 rounded-full px-3 active:bg-white/20"
            >
              <Text className="max-w-[90px] text-sm font-medium text-white" numberOfLines={1}>
                {user?.nome ? formatNome(user.nome) : 'Conta'}
              </Text>
              <Icon name="circle-user" size={22} />
            </Pressable>

            {/* Sair */}
            <Pressable
              onPress={logout}
              hitSlop={8}
              className="h-12 w-12 items-center justify-center rounded-full active:bg-white/20"
            >
              <Icon name="arrow-right-from-bracket" size={18} />
            </Pressable>
          </View>
        ) : (
          <View className="flex-row items-center gap-2 pr-2">
            <Pressable
              onPress={() => router.navigate('/login')}
              hitSlop={6}
              className="min-h-[44px] justify-center rounded-full border-2 border-white bg-white px-5 active:opacity-80"
            >
              <Text className="text-sm font-semibold text-[#7929c8]">Entrar</Text>
            </Pressable>
            <Pressable
              onPress={() => router.navigate('/cadastro')}
              hitSlop={6}
              className="min-h-[44px] justify-center rounded-full border-2 border-white px-5 active:bg-white/20"
            >
              <Text className="text-sm font-semibold text-white">Cadastrar</Text>
            </Pressable>
          </View>
        )}
      </LinearGradient>

      <NavDrawer visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};