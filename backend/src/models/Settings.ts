import mongoose, { Schema } from 'mongoose';
import { ISettings } from '../types';

const settingsSchema = new Schema<ISettings>(
  {
    siteName: {
      type: String,
      required: true,
      default: "Men's Clothing Store",
    },
    siteDescription: {
      type: String,
      required: true,
      default: 'Premium clothing for modern men',
    },
    siteLogo: String,
    contactEmail: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    shippingFee: {
      type: Number,
      required: true,
      default: 10,
    },
    taxRate: {
      type: Number,
      required: true,
      default: 0.08,
    },
    currency: {
      type: String,
      required: true,
      default: 'USD',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISettings>('Settings', settingsSchema);
