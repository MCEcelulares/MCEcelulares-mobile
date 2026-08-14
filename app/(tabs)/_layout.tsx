import { Tabs } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { Icon } from '../../src/components/layout/Icon';

export default function TabsLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7929c8',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Icon name="house" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="produtos"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color, size }) => <Icon name="mobile-screen" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Carrinho',
          href: isAuthenticated ? undefined : null,
          tabBarIcon: ({ color, size }) => <Icon name="cart-shopping" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: 'Pedidos',
          href: isAuthenticated ? undefined : null,
          tabBarIcon: ({ color, size }) => <Icon name="box" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="contato"
        options={{
          title: 'Contato',
          tabBarIcon: ({ color, size }) => <Icon name="phone" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
