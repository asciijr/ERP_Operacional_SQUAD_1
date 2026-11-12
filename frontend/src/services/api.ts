/** Cliente HTTP base. Toda chamada à API passa por services/ (Guia 8.2, regra 3). */
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao chamar ${path}`);
  }
  return (await response.json()) as T;
}
