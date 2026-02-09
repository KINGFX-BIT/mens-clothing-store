import { Request, Response } from 'express';
import Brand from '../models/Brand';

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Brand.find({});
    res.json(brands);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBrandBySlug = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
