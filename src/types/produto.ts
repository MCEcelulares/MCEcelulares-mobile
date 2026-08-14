import { MarcaType } from "./marca";
import { CategoriaType } from "./categoria";

export type ProdutoType = {
    id_produto: number;
    nome: string;
    descricao: string | null;
    preco: number;
    imagem: string | null;
    estoque: number;
    destaque: boolean;
    ativo: boolean;
    id_categoria: number;
    id_marca: number;
    marca?: MarcaType;
    categoria?: CategoriaType;
};

type PaginatedResponse<T> = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    data: T[];
};