import { body, ValidationChain } from 'express-validator';

export const registerValidation: ValidationChain[] = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const loginValidation: ValidationChain[] = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const productValidation: ValidationChain[] = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('sizes').isArray({ min: 1 }).withMessage('At least one size is required'),
  body('colors').isArray({ min: 1 }).withMessage('At least one color is required'),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
  body('stock').isNumeric().withMessage('Stock must be a number'),
  body('sku').trim().notEmpty().withMessage('SKU is required'),
];

export const reviewValidation: ValidationChain[] = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required'),
];

export const orderValidation: ValidationChain[] = [
  body('orderItems').isArray({ min: 1 }).withMessage('Order items are required'),
  body('shippingAddress').isObject().withMessage('Shipping address is required'),
  body('paymentMethod').trim().notEmpty().withMessage('Payment method is required'),
];
