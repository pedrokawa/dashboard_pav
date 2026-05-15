const BASE_URL = import.meta.env.VITE_API_URL;   
export interface Abastecimento {
    placa: string;
    marca: string;
    modelo: string;
    km: string;
    horimetro?: string;
    operador: string;
    litros: string;
    preco: string;
    total: string;
    posto: string;
    dataAbastecimento: string;
}

export const api = {   
   login: async (user: string, password: string) => {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password}),
        });

        if (!response.ok){
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message ||'Usuário ou senha incorretos.');
        } 

        return await response.json();
    },

    getVeiculos: async () => {
        const response = await fetch(`${BASE_URL}/api/veiculos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok){
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message ||'Erro ao buscar veículos.');
        }

        return await response.json();
    },

    getAbastecimentos: async () => {
        const response = await fetch(`${BASE_URL}/api/abastecimento`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok){
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message ||'Erro ao buscar abastecimentos.');
        }

        return await response.json();
    },

    getUsers: async () => {
        const response = await fetch(`${BASE_URL}/api/usuario`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok){
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message ||'Erro ao buscar usuários.');
        }

        return await response.json();
    },

    postAbast: async ( dados: Abastecimento) => {
      const response = await fetch(`${BASE_URL}/api/abastecimento`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados),
    });

    if (!response.ok){
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message ||'Erro ao cadastrar abastecimento.');
    }

    return await response.json();
    }
}