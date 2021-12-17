import '../namespaces/validation.ts';
import '../namespaces/products.ts';

import { Request, Response} from 'express';
import { productsModel } from '../models';

class CategoriesController {
  private productsModel;

  constructor() {
    this.productsModel = productsModel;
  }

  private _makeErrorResponse(errors: Validation.Errors) {
    return {
      success: false,
      error: errors
    };
  }

  private _makeSuccessResponse(data: any) {
    return {
      success: true,
      data: data
    };
  }

  getCategories = async (req: Request, res: Response) => {
    try {
      const data = await this.productsModel.getCategories();
      res.json(this._makeSuccessResponse(data));
    } catch (error: any) {
      res.json(this._makeErrorResponse(['Failed to get a categories.']));
    }
  }

  addCategory = async (req: Request, res: Response) => {
    const category: Products.Category = req.body;

    try {
      await this.productsModel.addCategory(category);
      res.json(this._makeSuccessResponse(category));
    } catch (error: any) {
      res.json(this._makeErrorResponse(['Failed to add a category.']));
    }
  }

  updateCategory = async (req: Request, res: Response) => {
    const id: Products.ID = +req.params.id;
    const category: Products.Product = req.body;

    try {
      await this.productsModel.updateCategory({ ...category, id }); 
      res.json(this._makeSuccessResponse({ message: 'success' }));
    } catch (error: any) {
      res.json(this._makeErrorResponse(['Failed to update a product.']));
    }
  }

  deleteCategory = async (req: Request, res: Response) => {
    const id: Products.ID = +req.params.id;

    try {
      await this.productsModel.deleteCategory(id); 
      res.json(this._makeSuccessResponse({ message: 'success' }));
    } catch (error: any) {
      res.json(this._makeErrorResponse(['Failed to delete a product.']));
    }
  }
}

export default new CategoriesController();
