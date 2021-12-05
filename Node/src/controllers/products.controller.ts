import { productsModel } from '../models';

class ProductsController {
  private productsModel = productsModel;
  async getProducts() {
    try {
      return await this.productsModel.getProducts();
    } catch (error) {
      return error;
    }
  }

  async addProduct() {
    try {
      return await this.productsModel.addProduct();
    } catch (error) {
      return error;
    }
  }

  getProductById() {
    return;
  }

  editProduct() {
    return;
  }

  deleteProduct() {
    return;
  }
}

export const productsController = new ProductsController();
