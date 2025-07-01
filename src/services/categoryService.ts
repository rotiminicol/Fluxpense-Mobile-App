
import { api } from './api';

export interface Category {
  id?: number;
  name: string;
  color: string;
  icon: string;
  user_id?: number;
  created_at?: string;
}

export const categoryService = {
  async getAll(): Promise<Category[]> {
    return api.apiRequest(`${api.API_BASE_URL}/category`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async getById(id: number): Promise<Category> {
    return api.apiRequest(`${api.API_BASE_URL}/category/${id}`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async create(category: Omit<Category, 'id' | 'created_at'>): Promise<Category> {
    return api.apiRequest(`${api.API_BASE_URL}/category`, {
      method: 'POST',
      headers: api.createHeaders(true),
      body: JSON.stringify(category),
    });
  },

  async update(id: number, category: Partial<Category>): Promise<Category> {
    return api.apiRequest(`${api.API_BASE_URL}/category/${id}`, {
      method: 'PATCH',
      headers: api.createHeaders(true),
      body: JSON.stringify(category),
    });
  },

  async delete(id: number): Promise<void> {
    return api.apiRequest(`${api.API_BASE_URL}/category/${id}`, {
      method: 'DELETE',
      headers: api.createHeaders(true),
    });
  }
};
