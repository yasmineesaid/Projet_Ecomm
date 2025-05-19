
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'client' | 'vendor' | 'admin';
  avatar?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inventory: number;
  vendor: {
    id: number;
    name: string;
  };
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  userId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
    productName: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const users: User[] = [
  {
    id: 1,
    name: 'Client User',
    email: 'client@example.com',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=50&h=50',
  },
  {
    id: 2,
    name: 'Vendor User',
    email: 'vendor@example.com',
    role: 'vendor',
    avatar: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=50&h=50',
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=50&h=50',
  },
];

export const categories: Category[] = [
  { id: 1, name: 'Electronics', slug: 'electronics' },
  { id: 2, name: 'Clothing', slug: 'clothing' },
  { id: 3, name: 'Home & Kitchen', slug: 'home-kitchen' },
  { id: 4, name: 'Books', slug: 'books' },
  { id: 5, name: 'Sports', slug: 'sports' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Laptop Pro X1',
    description: 'High performance laptop with 16GB RAM, 512GB SSD and Intel i7 processor.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400',
    category: 'electronics',
    inventory: 12,
    vendor: {
      id: 2,
      name: 'Vendor User',
    },
  },
  {
    id: 2,
    name: 'Smart Phone Z10',
    description: 'Latest smartphone with 128GB storage, 6.7 inch display and 48MP camera.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400',
    category: 'electronics',
    inventory: 25,
    vendor: {
      id: 2,
      name: 'Vendor User',
    },
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    description: 'Premium quality cotton t-shirt available in multiple colors.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&h=400',
    category: 'clothing',
    inventory: 100,
    vendor: {
      id: 2,
      name: 'Vendor User',
    },
  },
  {
    id: 4,
    name: 'Coffee Maker Deluxe',
    description: 'Automatic coffee maker with timer and multiple brew options.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400',
    category: 'home-kitchen',
    inventory: 15,
    vendor: {
      id: 2,
      name: 'Vendor User',
    },
  },
  {
    id: 5,
    name: 'Wireless Headphones',
    description: 'Noise cancelling wireless headphones with 20 hours battery life.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&h=400',
    category: 'electronics',
    inventory: 30,
    vendor: {
      id: 2,
      name: 'Vendor User',
    },
  },
];

export const orders: Order[] = [
  {
    id: 1,
    userId: 1,
    items: [
      {
        productId: 1,
        quantity: 1,
        price: 1299.99,
        productName: 'Laptop Pro X1',
      },
      {
        productId: 5,
        quantity: 1,
        price: 149.99,
        productName: 'Wireless Headphones',
      },
    ],
    total: 1449.98,
    status: 'delivered',
    date: '2025-05-10T14:30:00',
  },
  {
    id: 2,
    userId: 1,
    items: [
      {
        productId: 3,
        quantity: 2,
        price: 24.99,
        productName: 'Cotton T-Shirt',
      },
    ],
    total: 49.98,
    status: 'processing',
    date: '2025-05-15T09:15:00',
  },
];
