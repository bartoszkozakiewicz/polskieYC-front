// Funkcja pomocnicza do fetch z interceptorami
export async function fetchWithInterceptors(url: string, token: string, method: string = 'GET', body: any = null) {
    const modifiedOptions: RequestInit = {
        method, 
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null, 
    };

    try {
        const response = await fetch(url, modifiedOptions);

        if (!response.ok) {
            const answer = await response.json();
            console.log("Response: ", answer?.error);
            throw new Error(answer?.error);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Wystąpił błąd:', error);
        throw error; 
    }
}

