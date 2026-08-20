import { API_URL } from '../lib/api';

type ContatoInput = {
    nome: string;
    telefone: string;
    email: string;
    assunto: string;
    mensagem: string;
};

export async function contatoAPI(input: ContatoInput) {
    try {
        const response = await fetch(`${API_URL}/contato`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        return { success: true as const };
    } catch (error) {
        return {
            success: false as const,
            error: (error as Error).message || 'Servidor indisponível no momento.',
        };
    }
}