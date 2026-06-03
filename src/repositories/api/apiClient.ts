export async function safeFetch(url: string, options?: RequestInit): Promise<any> {
    const res = await fetch(url, options);
    
    const contentType = res.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    if (!res.ok) {
        let errMessage = `Erro API: HTTP ${res.status}`;
        if (isJson) {
            try {
               const errData = await res.json();
               errMessage = errData.error || errData.message || errMessage;
            } catch(e) {}
        }
        throw new Error(errMessage);
    }

    if (!isJson) {
        throw new Error(`API Endpoint '${url}' retornou HTML ou conteúdo inválido ao invés de JSON.`);
    }

    return await res.json();
}
