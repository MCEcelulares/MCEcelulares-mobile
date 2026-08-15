import { LinearGradient } from 'expo-linear-gradient';
import { Image, Link, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../src/components/layout/Button';
import { Icon } from '../src/components/layout/Icon';
import { Input } from '../src/components/layout/Input';
import { useLogin } from '../src/hooks/auth/useLogin';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { execute, loading } = useLogin();

  const handleSubmit = async () => {
    const res = await execute({ email, senha });
    if (res.success) router.replace('/');
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
            <Text className="text-lg font-bold text-white">Login</Text>
          </LinearGradient>

          <View className="gap-3 p-6">
            <Input
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

            <Button text="Entrar" onPress={handleSubmit} loading={loading} />

            <View className="flex-row justify-center gap-1 pt-2">
              <Text className="text-sm text-gray-600">Não tem uma conta?</Text>
              <Link href="/cadastro" replace className="text-sm font-bold text-purple-800">
                Cadastre-se aqui
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
