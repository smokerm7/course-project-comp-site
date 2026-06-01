import axios from 'axios';
import type {
  AdminUser,
  AuthResponse,
  Category,
  CreateOrderPayload,
  CreateRepairPayload,
  Product,
  ProductPayload,
  RegisterPayload,
  RepairRequest,
  Order,
  Status,
} from './types';

// В dev/preview Vite проксирует /api → :8080. Если прокси нет — укажите в .env: VITE_API_URL=http://localhost:8080/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ms7_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (error.response?.status === 404) {
      return (
        'Сервер не найден (404). Запустите backend: cd backend → mvnw.cmd spring-boot:run. ' +
        'Frontend только через npm run dev (не открывайте index.html напрямую).'
      );
    }
    if (error.code === 'ERR_NETWORK' || !error.response) {
      return 'Нет связи с backend (порт 8081). Запустите backend: cd backend → .\\run-dev.cmd';
    }
    return data?.message ?? error.message;
  }
  return 'Неизвестная ошибка';
}

export const authApi = {
  login: (username: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { username, password }).then((r) => r.data),
  register: (payload: RegisterPayload) =>
    api.post<AuthResponse>('/auth/register', payload).then((r) => r.data),
};

export const catalogApi = {
  categories: () => api.get<Category[]>('/categories').then((r) => r.data),
  products: (categoryId?: number) =>
    api
      .get<Product[]>('/products', { params: categoryId ? { categoryId } : {} })
      .then((r) => r.data),
  product: (id: number) => api.get<Product>(`/products/${id}`).then((r) => r.data),
};

export const orderApi = {
  create: (payload: CreateOrderPayload) =>
    api.post<Order>('/orders', payload).then((r) => r.data),
  my: () => api.get<Order[]>('/orders/my').then((r) => r.data),
};

export const repairApi = {
  create: (payload: CreateRepairPayload) =>
    api.post<RepairRequest>('/repairs', payload).then((r) => r.data),
  my: () => api.get<RepairRequest[]>('/repairs/my').then((r) => r.data),
  all: () => api.get<RepairRequest[]>('/repairs/all').then((r) => r.data),
  statuses: () => api.get<Status[]>('/repairs/statuses').then((r) => r.data),
  updateStatus: (id: number, statusId: number, masterComment?: string) =>
    api
      .patch<RepairRequest>(`/repairs/${id}/status`, { statusId, masterComment })
      .then((r) => r.data),
};

export const adminApi = {
  createProduct: (payload: ProductPayload) =>
    api.post<Product>('/admin/products', payload).then((r) => r.data),
  updateProduct: (id: number, payload: ProductPayload) =>
    api.put<Product>(`/admin/products/${id}`, payload).then((r) => r.data),
  deleteProduct: (id: number) => api.delete(`/admin/products/${id}`),
  orders: () => api.get<Order[]>('/admin/orders').then((r) => r.data),
  users: () => api.get<AdminUser[]>('/admin/users').then((r) => r.data),
};
