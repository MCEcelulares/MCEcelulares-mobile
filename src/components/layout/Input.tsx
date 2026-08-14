import { TextInput, type TextInputProps } from 'react-native';

type InputVariant = 'gray' | 'white';

interface InputProps extends TextInputProps {
  variant?: InputVariant;
}

const variantClasses: Record<InputVariant, string> = {
  gray: 'w-full rounded-full bg-gray-200 px-6 py-4 text-sm text-gray-700',
  white: 'w-full rounded-full bg-white px-6 py-4 text-sm text-gray-700 border border-gray-200',
};

export const Input = ({ variant = 'gray', className, placeholderTextColor = '#6b7280', ...props }: InputProps) => {
  return (
    <TextInput
      className={className ?? variantClasses[variant]}
      placeholderTextColor={placeholderTextColor}
      {...props}
    />
  );
};
