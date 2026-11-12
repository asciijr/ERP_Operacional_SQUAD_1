import { apiGet } from './api';

export type HealthResponse = { status: string };

export const getHealth = () => apiGet<HealthResponse>('/health');
