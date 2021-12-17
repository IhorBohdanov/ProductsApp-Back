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
    
    try {
      const data = await this.productsModel.getProducts();
      res.json(this._makeSuccessResponse(data));
    } catch (error: any) {
      res.json(this._makeErrorResponse([error]));
    }
  }

  addProduct = async (req: Request, res: Response) => {
    const product: Products.Product = req.body;

    try {
      await this.productsModel.addProduct(product);      
      res.json(this._makeSuccessResponse(product));      
    } catch (error: any) {
      res.json(this._makeErrorResponse(['Failed to add a product.']));
    }
  }

  getProductById = async (req: Request, res: Response) => {
    const id: Products.ID = +req.params.id;

    try {
      const data = await this.productsModel.getProductById(id);
      res.json(this._makeSuccessResponse(data));
    } catch (error: any) {
      res.json(this._makeErrorResponse([error]));
    }
  }

  updateProduct = async (req: Request, res: Response) => {
    const id: Products.ID = +req.params.id;
    const product: Products.Product = req.body;

    try {
      await this.productsModel.updateProduct({ ...product, id }); 
      res.json(this._makeSuccessResponse({ message: 'success' }));
    } catch (error: any) {
      res.json(this._makeErrorResponse(['Failed to update a product.']));
    }
  }

  deleteProduct = async (req: Request, res: Response) =>  {
    const id: Products.ID = +req.params.id;

    try {
      await this.productsModel.deleteProduct(id); 
      res.json(this._makeSuccessResponse({ message: 'success' }));
    } catch (error: any) {
      res.json(this._makeErrorResponse(['Failed to delete a product.']));
    }
  }
}

export default new ProductsController();
