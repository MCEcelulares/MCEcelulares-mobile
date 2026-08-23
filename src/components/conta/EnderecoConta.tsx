import { Pressable, Text, View } from 'react-native';
import { EnderecoType } from '../../types/endereco';
import { Icon } from '../layout/Icon';

type EnderecoCardProps = {
  endereco: EnderecoType;
  onDelete?: () => void;
  onPress?: () => void;
  selected?: boolean;
};

export const EnderecoCard = ({ endereco, onDelete, onPress, selected }: EnderecoCardProps) => {
  const conteudo = (
    <View className="flex-1 gap-0.5">
      <Text className="text-sm font-semibold text-gray-900">
        {endereco.endereco}, {endereco.numero}
        {endereco.complemento ? ` — ${endereco.complemento}` : ''}
      </Text>
      {endereco.bairro && <Text className="text-xs text-gray-500">{endereco.bairro}</Text>}
      <Text className="text-xs text-gray-500">
        {endereco.cidade} — {endereco.estado} — CEP: {endereco.cep}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`flex-row items-center gap-3 rounded-2xl border-2 p-4 ${
          selected ? 'border-purple-400 bg-purple-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <Icon name="location-dot" size={16} color={selected ? '#7929c8' : '#c4b5fd'} />
        {conteudo}
        <Icon name="chevron-right" size={12} color="#c4b5fd" />
      </Pressable>
    );
  }

  return (
    <View className="flex-row items-center gap-3 rounded-2xl border-2 border-gray-300 bg-gray-50 p-4">
      {conteudo}
      {onDelete && (
        <Pressable onPress={onDelete} hitSlop={8}>
          <Icon name="trash" size={16} color="#ff5c8a" />
        </Pressable>
      )}
    </View>
  );
};
