import '../namespaces/validation.ts';
import '../namespaces/products.ts';

import e, { Request, Response } from 'express';
import { productsModel } from '../models';

class ProductsController {
  private productsModel;

  constructor() {
    this.productsModel = productsModel;
  }

  getProducts = async (req: Request, res: Response) => {

    const options: any = req.query;
    
    try {
      const { data, total } = await this.productsModel.getProducts(options);
      const result = {
        success: true,
        data,
        total,
        page: options.page,
        pageSize: options.pageSize,
      };

      res.json(result);
    } catch (error: any) {
      console.log(error);
      const result = {
        success: false,
        errors: [
          {
            msg: 'Failed to get products'
          }
        ]
      };

      res.json(result);
    }
  }

  addProduct = async (req: Request, res: Response) => {
    const product: Products.Product = req.body;

    try {
      const newProduct = await this.productsModel.addProduct(product);
      const result = {
        success: true,
        data: newProduct
      };
      res.status(201).json(result);      
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: error?.message || 'Failed to add product'
          }
        ]
      };
      
      res.status(500).json(result);
    }
  }

  getProductById = async (req: Request, res: Response) => {
    const id: Products.ID = +req.params.id;

    try {
      const data = await this.productsModel.getProductById(id);
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

  updateProduct = async (req: Request, res: Response) => {
    const id: Products.ID = +req.params.id;
    const product: Products.Product = req.body;

    try {
      await this.productsModel.updateProduct({ ...product, id }); 
      const result = {
        success: true,
        data: {
          ...product,
          id
        }
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

  deleteProduct = async (req: Request, res: Response) =>  {
    const id: Products.ID = +req.params.id;

    try {
      await this.productsModel.deleteProduct(id); 
      const response = {
        success: true,
      };

      res.json(response);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: error.message || 'Failed to delete a product'
          }
        ]
      };
      res.status(500).json(result);
    }
  }
}

export default new ProductsController();
