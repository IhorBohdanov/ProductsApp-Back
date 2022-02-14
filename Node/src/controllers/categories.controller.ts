/// <reference path="../namespaces/validation.ts" />
/// <reference path="../namespaces/products.ts" />

import { Request, Response } from 'express';
import { productsModel } from '../models';

class CategoriesController {
  private productsModel;

  constructor() {
    this.productsModel = productsModel;
  }

  getCategories = async (req: Request, res: Response) => {
    try {
      const data = await this.productsModel.getCategories();
      const result = {
        success: true,
        data
      };

      res.json(result);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          error
        ]
      };
      res.status(500).json(result);
    }
  }

  getCategoryById = async (req: Request, res: Response) => {
    const id: Products.ID = +req.params.id;

    try {
      const data = await this.productsModel.getCategoryById(id);
      const result = {
        success: true,
        data,
      };
      res.json(result);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: error.message || 'Failed to get product' 
          }
        ]
      };
      res.status(404).json(result);
    }
  }

  addCategory = async (req: Request, res: Response) => {
    const category: Products.Category = req.body;

    try {
      const newCategory = await this.productsModel.addCategory(category);
      const result = {
        success: true,
        data: newCategory
      };
      res.status(201).json(result);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: 'Failed to add category'
          }
        ]
      };
      res.status(500).json(result);
    }
  }

  updateCategory = async (req: Request, res: Response) => {
    const id: Products.ID = +req.params.id;
    const category: Products.Product = req.body;
    try {
      await this.productsModel.updateCategory({ ...category, id });
      const result = {
        success: true,
        data: [
          {
            id,
            ...category,
          }
        ]
      };

      res.json(result);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: error.message || 'Failed to update a product'
          }
        ]
      };
      res.status(500).json(result);
    }
  }

  deleteCategory = async (req: Request, res: Response) => {
    const id: Products.ID = +req.params.id;

    try {
      await this.productsModel.deleteCategory(id);
      const result = {
        success: true
      };

      res.json(result);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: error.message || 'Failed to delete a category'
          }
        ]
      };

      res.status(500).json(result);
    }
  }
}

export default new CategoriesController();
