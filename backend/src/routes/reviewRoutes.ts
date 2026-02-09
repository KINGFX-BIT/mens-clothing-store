import express from 'express';
import { getProductReviews, createReview } from '../controllers/reviewController';
import { protect } from '../middleware/auth';
import { reviewValidation } from '../middleware/validation';

const router = express.Router();

router.get('/:productId', getProductReviews);
router.post('/:productId', protect, reviewValidation, createReview);

export default router;
