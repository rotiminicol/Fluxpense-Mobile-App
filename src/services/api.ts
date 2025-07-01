
const AUTH_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:T_4B5T-n';
const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:mVJnFa8M';

// Get auth token from localStorage
const getAuthToken = () => {
  const user = localStorage.getItem('fluxpense_user');
  if (user) {
    const userData = JSON.parse(user);
    return userData.authToken;
  }
  return null;
};

// Create headers with auth token
const createHeaders = (includeAuth = false) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Generic API request function
const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

export const api = {
  AUTH_BASE_URL,
  API_BASE_URL,
  createHeaders,
  apiRequest
};
