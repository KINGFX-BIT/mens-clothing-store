import { Request } from 'express';
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export interface IProduct extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrand extends Document {
  name: string;
  slug: string;
  logo?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder extends Document {
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
  paymentResult?: {
    id: string;
    status: string;
    updateTime: string;
    email: string;
  };
  subtotal: number;
  tax: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface ICart extends Document {
  user: string;
  items: {
    product: string;
    quantity: number;
    size: string;
    color: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IWishlist extends Document {
  user: string;
  products: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview extends Document {
  user: string;
  product: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICoupon extends Document {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  expiresAt: Date;
  isActive: boolean;
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISettings extends Document {
  siteName: string;
  siteDescription: string;
  siteLogo?: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  shippingFee: number;
  taxRate: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
