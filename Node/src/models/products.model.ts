import { rejects } from 'assert/strict';
import mysql from 'mysql2';
import Connection, {
  ConnectionOptions
} from 'mysql2/typings/mysql/lib/Connection';
import { QueryString } from './queries';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

type ProductsResult = Array<Product> | Error;

interface ProductsModelInterface {
  getProducts(): Promise<ProductsResult>;
}

class ProductsModel {
  private connection: Connection;

  constructor(params: ConnectionOptions) {
    this.connection = mysql.createConnection(params);
  }

  async getProducts(): Promise<ProductsResult> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        QueryString.GET_PRODUCTS,
        (error: Error, data: Array<Product>) => {
          if (error) {
            return reject(error);
          }

          return resolve(data);
        }
      );
    });
  }

  async addProduct() {
    return new Promise((resolve, reject) => {
      return resolve({ th: '234234' });
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
