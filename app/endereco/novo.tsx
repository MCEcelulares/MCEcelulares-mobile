import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../../src/components/layout/Button';
import { Icon } from '../../src/components/layout/Icon';
import { Input } from '../../src/components/layout/Input';
import { useCreateEndereco } from '../../src/hooks/endereco/useCreateEndereco';
import { maskCep } from '../../src/lib/masks';

export default function NovoEnderecoScreen() {
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const { execute, loading } = useCreateEndereco();

  const handleSubmit = async () => {
    const res = await execute({ endereco, numero, complemento, bairro, cidade, estado, cep });
    if (res.success) router.back();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-white">
      <ScrollView contentContainerClassName="gap-4 p-6">
        <Pressable onPress={() => router.back()} className="mb-2 flex-row items-center gap-1 self-end">
          <Text className="text-sm font-semibold text-purple-700">Voltar</Text>
          <Icon name="arrow-right-from-bracket" size={14} color="#7929c8" />
        </Pressable>

        <Text className="mb-2 flex-row items-center gap-2 text-2xl font-bold text-zinc-900">
          Cadastrar endereço
        </Text>

        <Input variant="white" placeholder="Rua / Avenida" value={endereco} onChangeText={setEndereco} />

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input variant="white" placeholder="Número" value={numero} onChangeText={setNumero} />
          </View>
          <View className="flex-1">
            <Input
              variant="white"
              placeholder="Complemento (opcional)"
              value={complemento}
              onChangeText={setComplemento}
            />
          </View>
        </View>

        <Input variant="white" placeholder="Bairro (opcional)" value={bairro} onChangeText={setBairro} />

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input variant="white" placeholder="Cidade" value={cidade} onChangeText={setCidade} />
          </View>
          <View className="w-20">
            <Input
              variant="white"
              placeholder="UF"
              value={estado}
              onChangeText={(v) => setEstado(v.toUpperCase())}
              maxLength={2}
              autoCapitalize="characters"
            />
          </View>
        </View>

        <Input
          variant="white"
          placeholder="CEP (ex: 12345-678)"
          value={cep}
          onChangeText={(v) => setCep(maskCep(v))}
          keyboardType="number-pad"
          maxLength={9}
        />

        <Button text="Salvar endereço" onPress={handleSubmit} loading={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
