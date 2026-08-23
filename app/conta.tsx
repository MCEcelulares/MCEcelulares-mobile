import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { Footer } from '../src/components/layout/Footer';
import { Header } from '../src/components/layout/Header';
import { Icon } from '../src/components/layout/Icon';
import { Input } from '../src/components/layout/Input';
import { EnderecoCard } from '../src/components/conta/EnderecoConta';
import { useDeleteEndereco } from '../src/hooks/endereco/useDeleteEndereco';
import { useGetEnderecos } from '../src/hooks/endereco/useGetEnderecos';
import { useDeleteUsuario } from '../src/hooks/usuario/useDeleteUsuario';
import { useGetUsuario } from '../src/hooks/usuario/useGetUsuario';
import { useUpdateUsuario } from '../src/hooks/usuario/useUpdateUsuario';
import { maskTelefone } from '../src/lib/masks';

export default function ContaScreen() {
  const { execute: fetchUsuario, usuario, loading } = useGetUsuario();
  const { execute: updateUsuario, loading: salvando } = useUpdateUsuario();
  const { execute: deleteUsuario, loading: excluindo } = useDeleteUsuario();
  const { execute: fetchEnderecos, enderecos, loading: carregandoEnderecos } = useGetEnderecos();
  const { execute: deleteEndereco } = useDeleteEndereco();

  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    fetchUsuario();
    fetchEnderecos();
  }, [fetchUsuario, fetchEnderecos]);

  const handleToggleEditar = () => {
    if (!editando && usuario) {
      setNome(usuario.nome);
      setTelefone(usuario.telefone);
    }
    setEditando(!editando);
  };

  const handleSalvar = async () => {
    const res = await updateUsuario({ nome, telefone });
    if (res.success) {
      setEditando(false);
      fetchUsuario();
    }
  };

  const handleExcluirConta = async () => {
    await deleteUsuario();
  };

  const handleExcluirEndereco = async (idEndereco: number) => {
    const res = await deleteEndereco(idEndereco);
    if (res.success) fetchEnderecos();
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }} stickyHeaderIndices={[0]}>
      <Header />

      <View className="flex-1 gap-8 p-6">
        <Text className="text-3xl font-bold">Meu Perfil</Text>

        <View className="gap-4 rounded-[32px] bg-gray-200 p-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon name="user" size={16} color="#7929c8" />
              <Text className="text-lg font-bold text-zinc-900">Dados pessoais</Text>
            </View>

            {!loading && usuario && (
              <View className="flex-row items-center gap-4">
                <Pressable onPress={handleToggleEditar} hitSlop={8}>
                  <Icon name={editando ? 'xmark' : 'pen'} size={16} color="#7929c8" />
                </Pressable>
                <Pressable onPress={handleExcluirConta} disabled={excluindo} hitSlop={8}>
                  <Icon name="trash" size={16} color="#ff5c8a" />
                </Pressable>
              </View>
            )}
          </View>

          {loading ? (
            <ActivityIndicator color="#7929c8" />
          ) : !usuario ? (
            <Text className="text-sm text-red-600">Erro ao carregar dados.</Text>
          ) : editando ? (
            <View className="gap-3">
              <View>
                <Text className="mb-1 text-xs font-semibold uppercase text-gray-400">Nome</Text>
                <Input variant="white" value={nome} onChangeText={setNome} />
              </View>
              <View>
                <Text className="mb-1 text-xs font-semibold uppercase text-gray-400">Telefone</Text>
                <Input variant="white" value={telefone} onChangeText={(v) => setTelefone(maskTelefone(v))} />
              </View>
              <View>
                <Text className="mb-1 text-xs font-semibold uppercase text-gray-400">E-mail</Text>
                <Text className="font-medium text-gray-500">{usuario.email}</Text>
                <Text className="text-xs text-gray-400">O e-mail não pode ser alterado.</Text>
              </View>
              <View>
                <Text className="mb-1 text-xs font-semibold uppercase text-gray-400">CPF</Text>
                <Text className="font-medium text-gray-500">{usuario.cpf}</Text>
                <Text className="text-xs text-gray-400">O CPF não pode ser alterado.</Text>
              </View>

              <Pressable
                onPress={handleSalvar}
                disabled={salvando}
                style={{ borderRadius: 999 }}
                className="items-center bg-purple-700 py-4 disabled:opacity-50"
              >
                <Text className="font-bold text-white">{salvando ? 'Salvando...' : 'Salvar alterações'}</Text>
              </Pressable>
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-4">
              <View className="w-[45%]">
                <Text className="text-xs font-semibold uppercase text-gray-400">Nome</Text>
                <Text className="font-medium text-gray-900">{usuario.nome}</Text>
              </View>
              <View className="w-[45%]">
                <Text className="text-xs font-semibold uppercase text-gray-400">E-mail</Text>
                <Text className="font-medium text-gray-900">{usuario.email}</Text>
              </View>
              <View className="w-[45%]">
                <Text className="text-xs font-semibold uppercase text-gray-400">CPF</Text>
                <Text className="font-medium text-gray-900">{usuario.cpf}</Text>
              </View>
              <View className="w-[45%]">
                <Text className="text-xs font-semibold uppercase text-gray-400">Telefone</Text>
                <Text className="font-medium text-gray-900">{usuario.telefone}</Text>
              </View>
            </View>
          )}
        </View>

        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon name="location-dot" size={14} color="#7929c8" />
              <Text className="font-semibold text-gray-800">Meus endereços</Text>
            </View>
            <Pressable onPress={() => router.push('/endereco/novo')} className="flex-row items-center gap-1">
              <Icon name="plus" size={12} color="#7929c8" />
              <Text className="text-sm font-semibold text-purple-700">Novo</Text>
            </Pressable>
          </View>

          {carregandoEnderecos ? (
            <ActivityIndicator color="#7929c8" />
          ) : enderecos.length === 0 ? (
            <View className="items-center gap-1 rounded-2xl border-2 border-dashed border-gray-200 p-4">
              <Text className="text-sm text-gray-400">Nenhum endereço cadastrado.</Text>
              <Pressable onPress={() => router.push('/endereco/novo')}>
                <Text className="text-sm font-semibold text-purple-700">Adicionar endereço</Text>
              </Pressable>
            </View>
          ) : (
            <View className="gap-2">
              {enderecos.map((e) => (
                <EnderecoCard key={e.id_endereco} endereco={e} onDelete={() => handleExcluirEndereco(e.id_endereco)} />
              ))}
            </View>
          )}
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}
