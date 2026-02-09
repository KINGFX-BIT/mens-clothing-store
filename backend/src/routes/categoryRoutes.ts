import express from 'express';
import { getCategories, getCategoryBySlug } from '../controllers/categoryController';

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

export default router;
