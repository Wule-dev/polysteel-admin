import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const ProductRoute = Router();

ProductRoute.get('/', ProductController.index);

export default ProductRoute;
