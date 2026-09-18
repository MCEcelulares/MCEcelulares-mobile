import { router } from 'expo-router';
import { Modal, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { Icon } from './Icon';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Icon>['name'];

type NavItem = {
  label: string;
  href: '/' | '/produtos' | '/carrinho' | '/pedidos' | '/contato';
  icon: IconName;
  requiresAuth?: boolean;
};

type NavDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '/', icon: 'house' },
  { label: 'Produtos', href: '/produtos', icon: 'mobile-screen' },
  { label: 'Carrinho', href: '/carrinho', icon: 'cart-shopping', requiresAuth: true },
  { label: 'Pedidos', href: '/pedidos', icon: 'box', requiresAuth: true },
  { label: 'Contato', href: '/contato', icon: 'phone' },
];

export const NavDrawer = ({ visible, onClose }: NavDrawerProps) => {
  const { isAuthenticated } = useAuth();
  const insets = useSafeAreaInsets();

  const visibleItems = NAV_ITEMS.filter((item) => !item.requiresAuth || isAuthenticated);

  const handleNavigate = (href: NavItem['href']) => {
    onClose();
    router.push(href);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{ paddingTop: insets.top + 16 }}
          className="h-full w-[75%] max-w-[300px] bg-white px-4"
        >
          <Text className="mb-4 px-2 text-xs font-bold uppercase text-gray-400">Navegação</Text>

          {visibleItems.map((item) => (
            <Pressable
              key={item.href}
              onPress={() => handleNavigate(item.href)}
              className="flex-row items-center gap-4 rounded-xl px-2 py-4 active:bg-gray-100"
            >
              <Icon name={item.icon} size={18} color="#7929c8" />
              <Text className="text-base font-medium text-gray-800">{item.label}</Text>
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
};