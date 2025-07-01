
import { api } from './api';

export interface Notification {
  id?: number;
  type: string;
  message: string;
  read: boolean;
  user_id?: number;
  created_at?: string;
}

export const notificationService = {
  async getAll(): Promise<Notification[]> {
    return api.apiRequest(`${api.API_BASE_URL}/notification`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async getById(id: number): Promise<Notification> {
    return api.apiRequest(`${api.API_BASE_URL}/notification/${id}`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
  },

  async create(notification: Omit<Notification, 'id' | 'created_at'>): Promise<Notification> {
    return api.apiRequest(`${api.API_BASE_URL}/notification`, {
      method: 'POST',
      headers: api.createHeaders(true),
      body: JSON.stringify(notification),
    });
  },

  async update(id: number, notification: Partial<Notification>): Promise<Notification> {
    return api.apiRequest(`${api.API_BASE_URL}/notification/${id}`, {
      method: 'PATCH',
      headers: api.createHeaders(true),
      body: JSON.stringify(notification),
    });
  },

  async delete(id: number): Promise<void> {
    return api.apiRequest(`${api.API_BASE_URL}/notification/${id}`, {
      method: 'DELETE',
      headers: api.createHeaders(true),
    });
  },

  async markAsRead(id: number): Promise<Notification> {
    return this.update(id, { read: true });
  },

  async getUnreadCount(): Promise<number> {
    const notifications = await this.getAll();
    return notifications.filter(n => !n.read).length;
  }
};
