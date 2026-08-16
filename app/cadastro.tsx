import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../src/components/layout/Button';
import { Icon } from '../src/components/layout/Icon';
import { Input } from '../src/components/layout/Input';
import { useSignup } from '../src/hooks/auth/useSingup';

const SENHA_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}/;

const maskCpf = (value: string) =>
  value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const maskTelefone = (value: string) =>
  value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaErro, setSenhaErro] = useState('');
  const { execute, loading } = useSignup();

  const handleSenhaChange = (value: string) => {
    setSenha(value);
    if (value === '') return setSenhaErro('');
    setSenhaErro(
      SENHA_REGEX.test(value) ? '' : 'Mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo.',
    );
  };

  const handleSubmit = async () => {
    if (confirmarSenha !== senha) {
      Alert.alert('Erro ao cadastrar', 'A senha e a confirmação de senha devem ser iguais.');
      return;
    }
    if (senhaErro) return;

    const res = await execute({ nome, email, senha, cpf, telefone });
    if (res.success) router.replace('/login');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-primary">
      <ScrollView contentContainerClassName="flex-1 items-center justify-center p-6">
        <View className="w-full max-w-sm overflow-hidden rounded-3xl bg-white">
          <LinearGradient
            colors={['#5714d7', '#7929c8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="items-center gap-2 px-6 pb-6 pt-4"
          >
            <Pressable onPress={() => router.back()} className="w-full flex-row justify-end">
              <View className="flex-row items-center gap-1">
                <Text className="text-sm font-semibold text-white">Voltar</Text>
                <Icon name="arrow-right-from-bracket" size={14} />
              </View>
            </Pressable>

            <Image
              source={require('../assets/images/logo-mcecelulares.png')}
              style={{ width: 160, height: 60 }}
              resizeMode="contain"
            />
            <Text className="text-lg font-bold text-white">Cadastro</Text>
          </LinearGradient>

          <View className="gap-3 p-6">
            <Input placeholder="Nome Completo" value={nome} onChangeText={setNome} />
            <Input
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Input
                  placeholder="CPF"
                  value={cpf}
                  onChangeText={(v) => setCpf(maskCpf(v))}
                  keyboardType="number-pad"
                  maxLength={14}
                />
              </View>
              <View className="flex-1">
                <Input
                  placeholder="Telefone"
                  value={telefone}
                  onChangeText={(v) => setTelefone(maskTelefone(v))}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </View>
            </View>

            <View className="gap-1">
              <Input placeholder="Criar Senha" value={senha} onChangeText={handleSenhaChange} secureTextEntry />
              {senhaErro !== '' && <Text className="px-2 text-sm font-medium text-red-600">{senhaErro}</Text>}
            </View>

            <Input placeholder="Repetir Senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />

            <Button text="Cadastrar Agora" onPress={handleSubmit} loading={loading} />

            <View className="flex-row justify-center gap-1 pt-2">
              <Text className="text-sm text-gray-600">Já tem uma conta?</Text>
              <Link href="/login" replace className="text-sm font-bold text-purple-800">
                Faça Login
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
