import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Button } from '../src/components/layout/Button';
import { Header } from '../src/components/layout/Header';
import { Icon } from '../src/components/layout/Icon';
import { Input } from '../src/components/layout/Input';
import { useSendEmail } from '../src/hooks/contato/useSendEmail';
import { Footer } from '@/src/components/layout/Footer';

const maskTelefone = (value: string) =>
  value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');

export default function ContatoScreen() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const { execute, loading } = useSendEmail();

  const handleSubmit = async () => {
    const res = await execute({
      nome,
      telefone: telefone.replace(/\D/g, ''),
      email,
      assunto,
      mensagem,
    });

    if (res.success) {
      setNome('');
      setTelefone('');
      setEmail('');
      setAssunto('');
      setMensagem('');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={[0]}
      >
        <Header />

        <View className="gap-6 p-6">
          <View className="gap-5 rounded-[32px] bg-gray-200 p-6">
            <View className="flex-row items-center gap-3">
              <Icon name="paper-plane" size={20} color="#7929c8" />
              <Text className="flex-1 text-2xl font-bold text-zinc-900">Mande a sua mensagem!</Text>
            </View>

            <Input
              variant="white"
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
              maxLength={100}
            />

            <Input
              variant="white"
              placeholder="Telefone: (99) 99999-9999"
              value={telefone}
              onChangeText={(v) => setTelefone(maskTelefone(v))}
              keyboardType="phone-pad"
              maxLength={15}
            />

            <Input
              variant="white"
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Input
              variant="white"
              placeholder="Assunto"
              value={assunto}
              onChangeText={setAssunto}
              maxLength={30}
            />

            <Input
              variant="white"
              placeholder="Digite a sua mensagem..."
              value={mensagem}
              onChangeText={setMensagem}
              multiline
              numberOfLines={4}
              maxLength={200}
              textAlignVertical="top"
              className="w-full rounded-[24px] bg-white px-6 py-4 text-sm text-gray-700 border border-gray-200"
              style={{ minHeight: 110 }}
            />

            <Button
              text={loading ? 'Enviando...' : 'Enviar Mensagem'}
              icon="envelope"
              onPress={handleSubmit}
              loading={loading}
            />
          </View>

          <View className="items-center gap-6 rounded-[32px] p-6">
            <View className="items-center gap-2">
              <View className="flex-row items-center gap-3">
                <Icon name="comment" size={20} color="#111827" />
                <Text className="text-2xl font-bold text-black">Fale direto comigo!</Text>
              </View>
              <Text className="text-center text-base text-black/80">
                Prefere um contato mais direto? Toque abaixo e fale comigo pelo WhatsApp ou Instagram.
              </Text>
            </View>

            <View className="w-full gap-4">
              <Pressable
                onPress={() => Linking.openURL('https://wa.me/554599457149')}
                style={{ borderRadius: 999, overflow: 'hidden' }}
              >
                <LinearGradient
                  colors={['#25D366', '#128C7E']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="w-full flex-row items-center justify-center gap-3 py-4"
                >
                  <Icon name="whatsapp" iconStyle="brand" size={20} />
                  <Text className="text-lg font-bold text-white">WhatsApp</Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                onPress={() => Linking.openURL('https://www.instagram.com/mcecelulares')}
                style={{ borderRadius: 999, overflow: 'hidden' }}
              >
                <LinearGradient
                  colors={['#f09433', '#dc2743', '#bc1888']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="w-full flex-row items-center justify-center gap-3 py-4"
                >
                  <Icon name="instagram" iconStyle="brand" size={20} />
                  <Text className="text-lg font-bold text-white">Instagram</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}