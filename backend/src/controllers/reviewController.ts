import { Response } from 'express';
import { validationResult } from 'express-validator';
import Review from '../models/Review';
import Product from '../models/Product';
import { AuthRequest } from '../types';

export const getProductReviews = async (req: AuthRequest, res: Response) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, comment } = req.body;
    const productId = req.params.productId;

    const existingReview = await Review.findOne({
      user: req.user?.id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      user: req.user?.id,
      product: productId,
      rating,
      comment,
    });

    const reviews = await Review.find({ product: productId });
    const numReviews = reviews.length;
    const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / numReviews;

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      numReviews,
    });

    const populatedReview = await Review.findById(review._id).populate('user', 'name');
    res.status(201).json(populatedReview);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
