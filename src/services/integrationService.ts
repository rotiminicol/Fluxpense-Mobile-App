
import { api } from './api';

export interface Integration {
  id?: number;
  provider: string;
  access_token: string;
  refresh_token?: string;
  user_id?: number;
  created_at?: string;
}

export const integrationService = {
  async getAll(): Promise<Integration[]> {
    return api.apiRequest(`${api.API_BASE_URL}/integration`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async getById(id: number): Promise<Integration> {
    return api.apiRequest(`${api.API_BASE_URL}/integration/${id}`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async create(integration: Omit<Integration, 'id' | 'created_at'>): Promise<Integration> {
    return api.apiRequest(`${api.API_BASE_URL}/integration`, {
      method: 'POST',
      headers: api.createHeaders(true),
      body: JSON.stringify(integration),
    });
  },

  async update(id: number, integration: Partial<Integration>): Promise<Integration> {
    return api.apiRequest(`${api.API_BASE_URL}/integration/${id}`, {
      method: 'PATCH',
      headers: api.createHeaders(true),
      body: JSON.stringify(integration),
    });
  },

  async delete(id: number): Promise<void> {
    return api.apiRequest(`${api.API_BASE_URL}/integration/${id}`, {
      method: 'DELETE',
      headers: api.createHeaders(true),
    });
  }
};
