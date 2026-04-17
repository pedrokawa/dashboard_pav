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
    }
}