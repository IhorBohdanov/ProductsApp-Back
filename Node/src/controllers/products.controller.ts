import '../namespaces/validation.ts';
import '../namespaces/products.ts';

import { Request, Response} from 'express';
import { productsModel } from '../models';

class ProductsController {
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

  getProducts = async (req: Request, res: Response) => {
    // minPrice
    // maxPrice
    // category
    // query
    // page
    // pageSize
    
    try {
      const data = await this.productsModel.getProducts();
      const result = {
        success: true,
        data,
      }

      console.log(result);
      res.json(result);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: 'Failed to get products'
          }
        ]
      }

      res.json(result);
    }
  }

  addProduct = async (req: Request, res: Response) => {
    const product: Products.Product = req.body;

    try {
      await this.productsModel.addProduct(product);
      const result = {
        success: true,
        data: product
      }
      res.status(201).json(result);      
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: 'Failed to add product'
          }
        ]
      }
      
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
      }
      res.json(result);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: 'Failed to get product' 
          }
        ]
      }
      res.json(result);
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
      }
      res.json(result);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: 'Failed to update a product'
          }
        ]
      }
      res.status(500).json(result);
    }
  }

  deleteProduct = async (req: Request, res: Response) =>  {
    const id: Products.ID = +req.params.id;

    try {
      const result = await this.productsModel.deleteProduct(id); 

      res.json(result);
    } catch (error: any) {
      const result = {
        success: false,
        errors: [
          {
            msg: 'Failed to delete a product'
          }
        ]
      }
      res.status(500).json(result);
    }
  }
}

export default new ProductsController();
