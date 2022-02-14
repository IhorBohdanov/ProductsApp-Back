import express from 'express';
import CategoriesController from '../controllers/categories.controller';
import { addCategoryCheck, catchErrors, updateCategoryCheck, deleteCategoryCheck  } from '../utils/validations';

const router: express.Router = express.Router();

router.get('/', CategoriesController.getCategories);

router.get('/:id', CategoriesController.getCategoryById);

router.post('/', addCategoryCheck, catchErrors, CategoriesController.addCategory);

router.put('/:id', updateCategoryCheck, catchErrors, CategoriesController.updateCategory);

router.delete('/:id', deleteCategoryCheck, catchErrors, CategoriesController.deleteCategory);

export const categoriesRoute = router;
