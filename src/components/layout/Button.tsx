import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';
import { Icon } from './Icon';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Icon>['name'];

interface ButtonProps extends Omit<PressableProps, 'children'> {
  text: string;
  icon?: IconName;
  loading?: boolean;
  variant?: 'gradient' | 'outline';
}

export const Button = ({ text, icon, loading, variant = 'gradient', disabled, ...props }: ButtonProps) => {
  const isDisabled = disabled || loading;

  if (variant === 'outline') {
    return (
      <Pressable
        disabled={isDisabled}
        style={{ borderRadius: 999 }}
        className="w-full flex-row items-center justify-center gap-2 border-2 border-white py-4 disabled:opacity-50"
        {...props}
      >
        {icon && <Icon name={icon} color="#fff" />}
        <Text className="text-base font-bold text-white">{text}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable disabled={isDisabled} className="w-full" style={{ borderRadius: 999, overflow: 'hidden' }} {...props}>
      <LinearGradient
        colors={isDisabled ? ['#9ca3af', '#9ca3af'] : ['#5714d7', '#7929c8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 999 }}
        className="w-full flex-row items-center justify-center gap-2 py-4"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            {icon && <Icon name={icon} color="#fff" />}
            <Text className="text-base font-bold text-white">{text}</Text>
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
};
