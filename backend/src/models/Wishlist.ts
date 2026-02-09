import mongoose, { Schema } from 'mongoose';
import { IWishlist } from '../types';

const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: String,
      required: true,
      ref: 'User',
      unique: true,
    },
    products: [
      {
        type: String,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWishlist>('Wishlist', wishlistSchema);
