import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { NavDrawer } from '../src/components/layout/NavDrawer';
import { AuthProvider } from '../src/contexts/AuthContext';
import { MenuProvider } from '../src/contexts/MenuContext';
import { useColorScheme } from '../src/hooks/use-color-scheme';


export const ReferenceRoute = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <MenuProvider>
        <ThemeProvider value = {colorScheme === 'dark' ? DarkTheme: DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="produtos/index" options={{ headerShown: false }} />
            <Stack.Screen name="produtos/detalhes" options={{ headerShown: false }} />
            <Stack.Screen name="carrinho" options={{ headerShown: false }} />
            <Stack.Screen name="pedidos" options={{ headerShown: false }} />
            <Stack.Screen name="contato" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="cadastro" options={{ headerShown: false, presentation: 'modal' }} />
          </Stack>
          <NavDrawer />
          <StatusBar style="light" />
        </ThemeProvider>
      </MenuProvider>
    </AuthProvider>
  );
}