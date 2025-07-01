
import { api } from './api';

export interface Report {
  id?: number;
  type: string;
  data: string;
  user_id?: number;
  created_at?: string;
}

export const reportService = {
  async getAll(): Promise<Report[]> {
    return api.apiRequest(`${api.API_BASE_URL}/report`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async getById(id: number): Promise<Report> {
    return api.apiRequest(`${api.API_BASE_URL}/report/${id}`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async create(report: Omit<Report, 'id' | 'created_at'>): Promise<Report> {
    return api.apiRequest(`${api.API_BASE_URL}/report`, {
      method: 'POST',
      headers: api.createHeaders(true),
      body: JSON.stringify(report),
    });
  },

  async update(id: number, report: Partial<Report>): Promise<Report> {
    return api.apiRequest(`${api.API_BASE_URL}/report/${id}`, {
      method: 'PATCH',
      headers: api.createHeaders(true),
      body: JSON.stringify(report),
    });
  },

  async delete(id: number): Promise<void> {
    return api.apiRequest(`${api.API_BASE_URL}/report/${id}`, {
      method: 'DELETE',
      headers: api.createHeaders(true),
    });
  }
};
