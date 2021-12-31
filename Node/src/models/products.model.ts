/// <reference path="../namespaces/products.ts" />

import { rejects } from 'assert/strict';
import mysql from 'mysql2';
import Connection, {
  ConnectionOptions
} from 'mysql2/typings/mysql/lib/Connection';
import { QueryString } from './queries';




class ProductsModel {
  private connection: any; //TODO Change to Connection

  constructor(params: ConnectionOptions) {
    this.connection = mysql.createConnection(params);
  }

  async getProducts(): Promise<Products.ProductsResult> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        QueryString.GET_PRODUCTS,
        (error: Error, data: Array<Products.Product>, fields: any) => {

          if (error) {
            return reject(error);
          }

          return resolve(data);
        }
      );
    });
  }

  async addProduct(product: Products.Product) {
    return new Promise((resolve, reject) => {
      this.connection.execute(
        QueryString.ADD_NEW_PRODUCT,
        [product.name, product.description, product.price],
        (error: Error, data: Array<Products.Product>) => {
          

          if (error) {
            reject(error);
          } 
          // TODO add dependency of affected rows
          resolve(data);
        }
      );
    });
  }

  async deleteProduct(id: Products.ID) {
    return new Promise((resolve, reject) => {
      this.connection.execute(
        QueryString.DELETE_PRODUCT,
        [id],
        (error: Error, data: Array<Products.Product>) => {

          if (error) {
            reject(error);
          } 

          // TODO add dependency of affected rows
          resolve(data);
        }
      );
    });
  } 

  async getProductById(id: Products.ID) {
    return new Promise((resolve, reject) => {
      this.connection.execute(
        QueryString.GET_PRODUCT_BY_ID,
        [id],
        (error: Error, data: Array<Products.Product>) => {
          if (error) {
            reject(error);
          } 

          resolve(data);
        }
      );
    });
  }

  async updateProduct(product: Products.Product) {
    return new Promise((resolve, reject) => {
      this.connection.execute(
        QueryString.UPDATE_PRODUCT,
        [product.name, product.description, product.price, product.id],
        (error: Error, data: Array<Products.Product>) => {

          if (error) {
            reject(error);
          } 

          resolve(data);
        }
      );
    });
  }

  async getCategories(): Promise<Products.ProductsResult> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        QueryString.GET_CATEGORIES,
        (error: Error, data: Array<Products.Product>) => {
          if (error) {
            return reject(error);
          }

          return resolve(data);
        }
      );
    });
  }


  async addCategory(category: Products.Category) {
    return new Promise((resolve, reject) => {
      this.connection.execute(
        QueryString.ADD_CATEGORY,
        [category.name],
        (error: Error, data: Array<Products.Product>) => {
          if (error) {
            return reject(error);
          }

          return resolve(data);
        }
      );
    });
  } 

  async updateCategory(category: Products.Category) {
    return new Promise((resolve, reject) => {
      this.connection.execute(
        QueryString.UPDATE_CATEGORY,
        [category.name, category.id],
        (error: Error, data: Array<Products.Product>) => {

          if (error) {
            reject(error);
          } 

          resolve(data);
        }
      );
    });
  }

  async deleteCategory(id: Products.ID) {
    return new Promise((resolve, reject) => {
      this.connection.execute(
        QueryString.DELETE_CATEGORY,
        [id],
        (error: Error, data: Array<Products.Product>) => {

          if (error) {
            reject(error);
          } 

          // TODO add dependency of affected rows
          resolve(data);
        }
      );
    });
  }
}






export const productsModel = new ProductsModel({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : undefined, // ConnectionOptions requires a port as a number, but process.env.DB_PORT returns a string
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
