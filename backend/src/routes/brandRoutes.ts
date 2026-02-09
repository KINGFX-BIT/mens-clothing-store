import express from 'express';
import { getBrands, getBrandBySlug } from '../controllers/brandController';

const router = express.Router();

router.get('/', getBrands);
router.get('/:slug', getBrandBySlug);

export default router;
