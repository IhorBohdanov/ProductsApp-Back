import express from 'express';
import ProductsController from '../controllers/products.controller';
import { addProductCheck, catchErrors, getProductByIdCheck, updateProductCheck, deleteProductCheck } from '../utils/validations';

const router: express.Router = express.Router();

router.get('/', ProductsController.getProducts);

router.post('/', addProductCheck, catchErrors, ProductsController.addProduct);

router.get('/:id', getProductByIdCheck, catchErrors, ProductsController.getProductById);

router.put('/:id', updateProductCheck, catchErrors, ProductsController.updateProduct);

router.delete('/:id', deleteProductCheck, catchErrors, ProductsController.deleteProduct);

export const producstRoute = router;
