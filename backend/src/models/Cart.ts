import mongoose, { Schema } from 'mongoose';
import { ICart } from '../types';

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: String,
      required: true,
      ref: 'User',
      unique: true,
    },
    items: [
      {
        product: {
          type: String,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICart>('Cart', cartSchema);
