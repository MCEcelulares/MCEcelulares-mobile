import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useCreateItemCarrinho } from '../../hooks/carrinho/useCreateItemCarrinho';
import { ProdutoType } from '../../types/produto';
import { Button } from '../layout/Button';
import { getImagemUrl } from '../../lib/getImagemUrl';

// const placeholderImg = 'https://placehold.co/200x200/e5e7eb/9ca3af/png?text=Sem+imagem';

const formatPreco = (preco: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(preco));

type ProdutoCardProps = {
  produto: ProdutoType;
  width: number;
};

export const ProdutoCard = ({ produto, width }: ProdutoCardProps) => {
  const { execute: adicionarAoCarrinho, loading } = useCreateItemCarrinho();
  const [done, setDone] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleAdd = async () => {
    const res = await adicionarAoCarrinho(produto.id_produto);
    if (res?.success === false) return;

    setDone(true);
    timeoutRef.current = setTimeout(() => setDone(false), 1500);
  };

  const texto = loading ? 'Carregando...' : done ? 'Pronto!' : 'Adicionar';
  const icone = done ? 'check' : 'cart-shopping';

  return (
    <View style={{ width }} className="overflow-hidden rounded-[23px] border-2 border-purple-800 bg-white">
      <View
        onTouchEnd={() => router.push(`/produtos/detalhes?id=${produto.id_produto}`)}
        className="h-[140px] items-center justify-center bg-[#E5E7EB] p-4"
      >
        <Image
          source={{ uri: getImagemUrl(produto.imagem) }}
          className="h-full w-full"
          resizeMode="contain"
        />
      </View>

      <View className="items-center gap-1 p-4">
        <Text numberOfLines={2} className="min-h-[44px] text-center text-base font-semibold text-black">
          {produto.nome}
        </Text>
        <Text className="mb-1 text-lg font-semibold text-purple-800">{formatPreco(produto.preco)}</Text>

        <Button text={texto} icon={icone} onPress={handleAdd} loading={loading} />
      </View>
    </View>
  );
};