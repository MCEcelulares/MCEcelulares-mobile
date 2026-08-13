import { API_URL } from '../lib/api';

type LoginInput = {
    email: string;
    senha: string;
};

export async function loginAPI(input: LoginInput) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });

        const data = await response.json();
        if(!response.ok) throw new Error(data.message);

        return {
            success: true as const,
            id_usuario: data.id_usuario as number,
            nome: data.nome as string,
            token: data.token as string,
        };
    } catch (error) {
        return {
            success: false as const,
            error: (error as Error).message || 'Servidor indisponível no momento.',
        };
    }
}

type SingupInput = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    telefone: string;
};

export async function singupAPI(input: SingupInput) {
    try {
        const response = await fetch(`${API_URL}/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });

        const data = await response.json();
        if(!response.ok) throw new Error(data.message);

        return { success: true as const };
    } catch (error) {
        return {
            success: false as const,
            error: (error as Error).message || 'Servidor indisponível no momento.',
        };
    }
}