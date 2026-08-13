import { API_URL } from '../lib/api';
import { fetchAuth } from '../lib/fetchAuth';
import { ProdutoType } from '../types/produto';

export async function getProdutoAPI(id_produto: number) {
    try{
        const response = await fetchAuth(`${API_URL}/produto/${id_produto}`);
        const data = await response.json();
        if(!response.ok) throw new Error(data.message);

        return { 
            success: true as const,
            produto: data as ProdutoType,
        }
    } catch (error) {
        return {
            success: false as const,
            error: (error as Error).message || 'Servidor indisponível no momento.',
        };
    }
}

type GetProdutosInput = {
    page?: number;
    id_categoria?: string;
    id_marca?: string;
    destaque?: boolean;
    ativo?: boolean;
};

export async function getProdutosAPI(input: GetProdutosInput) {
    try{
        const params = new URLSearchParams();
        if(input.page !== undefined) params.set('page', String(input.page));
        if(input.id_categoria !== undefined) params.set('id_categoria', input.id_categoria);
        if(input.id_marca !== undefined) params.set('id_marca', input.id_marca);
        if(input.destaque !== undefined) params.set('destaque', String(input.destaque));
        if(input.ativo !== undefined) params.set('ativo', String(input.ativo));

        const response = await fetchAuth(`${API_URL}/produto?${params}`);
        const data = await response.json();
        if(!response.ok) throw new Error(data.message);

        return {
            success: true as const,
            produtos: data.data as ProdutoType[],
            total: data.total as number,
            totalPages: data.totalPages as number,
        };
    } catch (error) {
        return {
            success: false as const,
            error: (error as Error).message || 'Servidor indisponível no momento.'
        }
    }
}

