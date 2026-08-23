import { useState } from 'react';
import { FlatList, Modal, Pressable, Text } from 'react-native';
import { Icon } from './Icon';

type SelectOption = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
};

export const SelectDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  loading,
  disabled,
}: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder;
  const isDisabled = disabled || loading || options.length === 0;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        disabled={isDisabled}
        className="flex-row items-center gap-2 rounded-full bg-gray-100 px-5 py-2.5 disabled:opacity-50"
      >
        <Text numberOfLines={1} className="text-sm font-medium text-gray-800">
          {loading ? 'Carregando...' : selectedLabel}
        </Text>
        <Icon name="chevron-down" size={10} color="#333" />
      </Pressable>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <Pressable className="flex-1 justify-end bg-black/40" onPress={() => setIsOpen(false)}>
          <Pressable onPress={(e) => e.stopPropagation()} className="max-h-[60%] rounded-t-3xl bg-white pb-8 pt-4">
            <Text className="mb-2 px-6 text-xs font-bold uppercase text-gray-400">{placeholder}</Text>
            <FlatList
              data={[{ label: placeholder, value: '' }, ...options]}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelect(item.value)}
                  className={`px-6 py-3.5 ${item.value === value ? 'bg-purple-50' : ''}`}
                >
                  <Text
                    className={`text-base ${item.value === value ? 'font-bold text-purple-800' : 'text-gray-800'}`}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};
