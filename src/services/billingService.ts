
import { api } from './api';

export interface Billing {
  id?: number;
  plan: string;
  status: string;
  renewal_date: string;
  user_id?: number;
  created_at?: string;
}

export const billingService = {
  async getAll(): Promise<Billing[]> {
    return api.apiRequest(`${api.API_BASE_URL}/billing`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async getById(id: number): Promise<Billing> {
    return api.apiRequest(`${api.API_BASE_URL}/billing/${id}`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async create(billing: Omit<Billing, 'id' | 'created_at'>): Promise<Billing> {
    return api.apiRequest(`${api.API_BASE_URL}/billing`, {
      method: 'POST',
      headers: api.createHeaders(true),
      body: JSON.stringify(billing),
    });
  },

  async update(id: number, billing: Partial<Billing>): Promise<Billing> {
    return api.apiRequest(`${api.API_BASE_URL}/billing/${id}`, {
      method: 'PATCH',
      headers: api.createHeaders(true),
      body: JSON.stringify(billing),
    });
  },

  async delete(id: number): Promise<void> {
    return api.apiRequest(`${api.API_BASE_URL}/billing/${id}`, {
      method: 'DELETE',
      headers: api.createHeaders(true),
    });
  }
};
