
import { api } from './api';

export interface Team {
  id?: number;
  name: string;
  owner_id?: number;
  created_at?: string;
}

export const teamService = {
  async getAll(): Promise<Team[]> {
    return api.apiRequest(`${api.API_BASE_URL}/team`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async getById(id: number): Promise<Team> {
    return api.apiRequest(`${api.API_BASE_URL}/team/${id}`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async create(team: Omit<Team, 'id' | 'created_at'>): Promise<Team> {
    return api.apiRequest(`${api.API_BASE_URL}/team`, {
      method: 'POST',
      headers: api.createHeaders(true),
      body: JSON.stringify(team),
    });
  },

  async update(id: number, team: Partial<Team>): Promise<Team> {
    return api.apiRequest(`${api.API_BASE_URL}/team/${id}`, {
      method: 'PATCH',
      headers: api.createHeaders(true),
      body: JSON.stringify(team),
    });
  },

  async delete(id: number): Promise<void> {
    return api.apiRequest(`${api.API_BASE_URL}/team/${id}`, {
      method: 'DELETE',
      headers: api.createHeaders(true),
    });
  }
};
