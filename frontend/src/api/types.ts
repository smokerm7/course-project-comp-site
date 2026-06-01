export type Role = 'CLIENT' | 'EMPLOYEE' | 'ADMIN';

export type Category = {
  id: number;
  name: string;
  description?: string;
};

export type Product = {
  id: number;
  name: string;
  description?: string;
  manufacturer?: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  category?: Category;
};

export type AuthResponse = {
  token: string;
  username: string;
  role: Role;
};

export type Status = {
  id: number;
  name: string;
  type: 'ORDER' | 'REPAIR';
  description?: string;
};

export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: Product;
};

export type Order = {
  id: number;
  orderDate: string;
  totalAmount: number;
  deliveryAddress?: string;
  status: Status;
  items: OrderItem[];
  client?: { id: number; fullName: string; phone?: string };
};

export type RepairRequest = {
  id: number;
  deviceType: string;
  deviceModel: string;
  problemDescription: string;
  masterComment?: string;
  estimatedPrice?: number;
  createdAt: string;
  updatedAt?: string;
  status: Status;
  client?: { id: number; fullName: string; phone: string };
};

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  stockQuantity: number;
  imageUrl?: string;
};

export type AdminUser = {
  id: number;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
};

export type CreateOrderPayload = {
  deliveryAddress: string;
  items: { productId: number; quantity: number }[];
};

export type CreateRepairPayload = {
  deviceType: string;
  deviceModel: string;
  problemDescription: string;
};

export type ProductPayload = {
  categoryId: number;
  name: string;
  description?: string;
  manufacturer?: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
};
