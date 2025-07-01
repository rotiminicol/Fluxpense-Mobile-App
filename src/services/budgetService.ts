
import { api } from './api';

export interface Budget {
  id?: number;
  amount: number;
  period: string;
  start_date: string;
  end_date: string;
  user_id?: number;
  category_id: number;
  created_at?: string;
}

export const budgetService = {
  async getAll(): Promise<Budget[]> {
    return api.apiRequest(`${api.API_BASE_URL}/budget`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async getById(id: number): Promise<Budget> {
    return api.apiRequest(`${api.API_BASE_URL}/budget/${id}`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async create(budget: Omit<Budget, 'id' | 'created_at'>): Promise<Budget> {
    return api.apiRequest(`${api.API_BASE_URL}/budget`, {
      method: 'POST',
      headers: api.createHeaders(true),
      body: JSON.stringify(budget),
    });
  },

  async update(id: number, budget: Partial<Budget>): Promise<Budget> {
    return api.apiRequest(`${api.API_BASE_URL}/budget/${id}`, {
      method: 'PATCH',
      headers: api.createHeaders(true),
      body: JSON.stringify(budget),
    });
  },

  async delete(id: number): Promise<void> {
    return api.apiRequest(`${api.API_BASE_URL}/budget/${id}`, {
      method: 'DELETE',
      headers: api.createHeaders(true),
    });
  }
};
