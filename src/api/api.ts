import { type Abastecimento } from "../types/Abastecimento";
import { type Veiculo } from "../types/Veiculo";

const BASE_URL = import.meta.env.VITE_API_URL;   


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

    getVeiculos: async (): Promise<Veiculo[]> => {
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

    getAbastecimentos: async (): Promise<Abastecimento[]> => {
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

    postAbast: async ( dados: Abastecimento): Promise<Abastecimento> => {
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
    },

    getVeicPlaca: async (placa: string): Promise<Veiculo | null>  => {
        const placaLimpa = placa.trim().toUpperCase();
        
        const response = await fetch(`${BASE_URL}/api/veiculos/${placaLimpa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok){
            return null;
        }

        return await response.json();   
    },

    postVeic: async (dados: Veiculo): Promise<Veiculo> => {
        const response = await fetch(`${BASE_URL}/api/veiculos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados),
        });

        if (!response.ok){
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message ||'Erro ao cadastrar veículo.');
        }

        return await response.json();
    },
}