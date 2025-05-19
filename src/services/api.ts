
import { toast } from "@/components/ui/sonner";

const API_URL = 'http://127.0.0.1:8000/api';

interface ApiOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

const getToken = (): string | null => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      return parsedUser.token;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }
  return null;
};

const getHeaders = (includeAuth: boolean = true): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      // Non authentifié - déconnexion
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Session expirée, veuillez vous reconnecter');
    }
    
    const message = data.message || 'Une erreur est survenue';
    toast.error(message);
    throw new Error(message);
  }
  
  return data;
};

export const api = {
  // Authentification
  register: async (userData: any) => {
    const options: ApiOptions = {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData),
    };
    
    const response = await fetch(`${API_URL}/register`, options);
    return handleResponse(response);
  },
  
  login: async (credentials: any) => {
    const options: ApiOptions = {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials),
    };
    
    const response = await fetch(`${API_URL}/login`, options);
    return handleResponse(response);
  },
  
  logout: async () => {
    const options: ApiOptions = {
      method: 'POST',
      headers: getHeaders(),
    };
    
    const response = await fetch(`${API_URL}/logout`, options);
    return handleResponse(response);
  },
  
  getUser: async () => {
    const options: ApiOptions = {
      method: 'GET',
      headers: getHeaders(),
    };
    
    const response = await fetch(`${API_URL}/user`, options);
    return handleResponse(response);
  },
  
  // Produits
  getProducts: async (params: Record<string, any> = {}) => {
    const queryString = Object.keys(params).length ? `?${new URLSearchParams(params).toString()}` : '';
    const options: ApiOptions = {
      method: 'GET',
      headers: getHeaders(false),
    };
    
    const response = await fetch(`${API_URL}/products${queryString}`, options);
    return handleResponse(response);
  },
  
  getProduct: async (id: number) => {
    const options: ApiOptions = {
      method: 'GET',
      headers: getHeaders(false),
    };
    
    const response = await fetch(`${API_URL}/products/${id}`, options);
    return handleResponse(response);
  },
  
  createProduct: async (productData: any) => {
    const options: ApiOptions = {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    };
    
    const response = await fetch(`${API_URL}/products`, options);
    return handleResponse(response);
  },
  
  updateProduct: async (id: number, productData: any) => {
    const options: ApiOptions = {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    };
    
    const response = await fetch(`${API_URL}/products/${id}`, options);
    return handleResponse(response);
  },
  
  deleteProduct: async (id: number) => {
    const options: ApiOptions = {
      method: 'DELETE',
      headers: getHeaders(),
    };
    
    const response = await fetch(`${API_URL}/products/${id}`, options);
    return response.status === 204 ? true : handleResponse(response);
  },
  
  // Commandes
  getOrders: async () => {
    const options: ApiOptions = {
      method: 'GET',
      headers: getHeaders(),
    };
    
    const response = await fetch(`${API_URL}/orders`, options);
    return handleResponse(response);
  },
  
  getOrder: async (id: number) => {
    const options: ApiOptions = {
      method: 'GET',
      headers: getHeaders(),
    };
    
    const response = await fetch(`${API_URL}/orders/${id}`, options);
    return handleResponse(response);
  },
  
  createOrder: async (orderData: any) => {
    const options: ApiOptions = {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData),
    };
    
    const response = await fetch(`${API_URL}/orders`, options);
    return handleResponse(response);
  },
  
  updateOrderStatus: async (id: number, status: string) => {
    const options: ApiOptions = {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    };
    
    const response = await fetch(`${API_URL}/orders/${id}/status`, options);
    return handleResponse(response);
  },
};

export default api;
