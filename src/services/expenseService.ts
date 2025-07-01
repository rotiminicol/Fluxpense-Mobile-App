
import { api } from './api';

export interface Expense {
  id?: number;
  amount: number;
  description: string;
  date: string;
  receipt_url?: string;
  user_id?: number;
  category_id: number;
  created_at?: string;
}

export const expenseService = {
  async getAll(): Promise<Expense[]> {
    return api.apiRequest(`${api.API_BASE_URL}/expense`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async getById(id: number): Promise<Expense> {
    return api.apiRequest(`${api.API_BASE_URL}/expense/${id}`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async create(expense: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> {
    return api.apiRequest(`${api.API_BASE_URL}/expense`, {
      method: 'POST',
      headers: api.createHeaders(true),
      body: JSON.stringify(expense),
    });
  },

  async update(id: number, expense: Partial<Expense>): Promise<Expense> {
    return api.apiRequest(`${api.API_BASE_URL}/expense/${id}`, {
      method: 'PATCH',
      headers: api.createHeaders(true),
      body: JSON.stringify(expense),
    });
  },

  async delete(id: number): Promise<void> {
    return api.apiRequest(`${api.API_BASE_URL}/expense/${id}`, {
      method: 'DELETE',
      headers: api.createHeaders(true),
    });
  }
};
