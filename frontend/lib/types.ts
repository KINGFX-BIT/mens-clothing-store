export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  images: string[];
  stock: number;
  sku: string;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  rating: number;
  numReviews: number;
}

export interface CartItem {
  _id?: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: {
    product: string;
    name: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  status: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
}
