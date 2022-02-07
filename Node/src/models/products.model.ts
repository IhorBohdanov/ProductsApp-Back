/// <reference path="../namespaces/products.ts" />

import { rejects } from 'assert/strict';
const mysql = require('mysql2/promise');
import Connection, {
  ConnectionOptions,
} from 'mysql2/typings/mysql/lib/Connection';

// const from 'mysql2/typings/mysql/lib';
import { QueryString, makeProductsQueryString } from './queries';

enum ColumnNames {
  PRICE = 'price',
  NAME = 'name',
  DESCRIPTION = 'description',
}

class ProductsModel {
  private connection: any; //TODO Change to Connection
  private connectionParams: ConnectionOptions;

  constructor(params: ConnectionOptions) {
    this.connectionParams = params;
  }

  async _createConnection() {
    if (!this.connection) {
      this.connection = await mysql.createConnection(this.connectionParams);
    }
  }

  _processProductResponse(respArr: any)  {
    return respArr.map((item: any) => ({...item, category: item.category ? item.category.split(',').map(Number) : []}))
  }

  _getQueryFromOptions(options: any): any {
    const conditionsArray: Array<string> = [];
    let resultQuery: string = '';
    let pagination: string = '';

    const {
      minPrice,
      maxPrice,
      search,
      category,
      page,
      pageSize,
    } = options;

    if (minPrice) {
      conditionsArray.push(`${ColumnNames.PRICE} >= ${minPrice}`);
    }

    if (maxPrice) {
      conditionsArray.push(`${ColumnNames.PRICE} <= ${maxPrice}`);
    }

    if (search) {
      conditionsArray.push(`(${ColumnNames.NAME} ${QueryString.LIKE} '%${search}%' 
      ${QueryString.OR} 
      ${ColumnNames.DESCRIPTION} ${QueryString.LIKE} '%${search}%')`);
    }

    if (category) {
      conditionsArray.push()
    }

    if (conditionsArray.length) {
      resultQuery += QueryString.WHERE;
      resultQuery += conditionsArray.reduce((prev: string, cur: string, currentIndex: number, array: Array<string>): any => {
        if (currentIndex !== array.length - 1) {
          return prev + cur + QueryString.AND;
        }
        return prev + cur;
      }, '');
    }

    if (pageSize) {
      pagination += ` ${QueryString.LIMIT} ${pageSize}`;
    }

    if (page) {
      pagination += ` ${QueryString.OFFSET} ${(page - 1) * pageSize}`;
    }

    return { query: resultQuery, pagination };
  }

  async getProducts(options: any): Promise<Products.ProductsResultExtended> {
    const filtersParams: any = this._getQueryFromOptions(options);
    const query:string = makeProductsQueryString(filtersParams);
    
    await this._createConnection();
    let [data] = await this.connection.execute(query);
    const [rowsCount] = await this.connection.execute(QueryString.GET_ROWS_COUNT);

    data = this._processProductResponse(data); 

    return { data, total: rowsCount[0].count };
  }

  async addProduct(product: Products.Product) {
    await this._createConnection();
    await this.connection.execute(QueryString.TRANSACTION_ISOLATION_LEVEL);
    await this.connection.beginTransaction()

    try {
      const [categories,] = await this.connection.execute(QueryString.GET_CATEGORIES);
      if (categories.length < 1) throw new Error('There is no categories added');

      const categoriesIds = categories.map((cat: any): any => cat.id);
      let difference = product.category.filter((catId: Number): Boolean => !categoriesIds.includes(catId));
      if (difference.length) throw new Error('You try to add product with non-existent category');

      await this.connection.execute(QueryString.ADD_NEW_PRODUCT, [product.name, product.description, product.price]);
      const [data] = await this.connection.execute(QueryString.GET_LAST_PRODUCT_ID);
      const lastProductId = data[0].id;

      for (let cat of product.category) {
        await this.connection.execute(QueryString.ADD_PRODUCT_CATEGORY, [lastProductId, cat]);
      }

      await this.connection.commit();

      return {
        id: lastProductId,
        ...product,
      }
    } catch (error) {
      this.connection.rollback();
      throw error
    }
  }

  async deleteProduct(id: Products.ID) {
    await this._createConnection();
    await this.connection.beginTransaction();

    try {
      const [res] = await this.connection.execute(QueryString.DELETE_PRODUCT, [id]);
      if (res.affectedRows < 1) throw new Error(`Product with id=${id} doesn't exist`);
      await this.connection.execute(QueryString.DELETE_PRODUCT_CATEGORIES, [id]);
      await this.connection.commit();
    } catch (error) {
      this.connection.rollback();
      throw (error)
    }
  }

  async getProductById(id: Products.ID) {
    await this._createConnection();
    const [data] = await this.connection.execute(QueryString.GET_PRODUCT_BY_ID, [id]);
    if (!data.length) throw new Error(`Product with id=${id} doesn't exist`);
    return this._processProductResponse(data);
  }

  async updateProduct(product: Products.Product) {
    await this._createConnection();
    const [data] = await this.connection.execute(QueryString.UPDATE_PRODUCT, [product.name, product.description, product.price, product.id]);
    if (data.affectedRows < 1) throw new Error(`Product with id=${product.id} doesn't exist`);
  }

  async getCategories(): Promise<Products.ProductsResult> {
    await this._createConnection();
    const [data] = await this.connection.execute(QueryString.GET_CATEGORIES);
    return data;
  }

  async addCategory(category: Products.Category) {
    await this._createConnection();
    await this.connection.execute(QueryString.ADD_CATEGORY, [category.name]);

    const [data] = await this.connection.execute(QueryString.GET_LAST_CATEGORY_ID);
    const id = data[0].id;

    return {
      id,
      ...category,
    }
  }

  async updateCategory(category: Products.Category) {
    await this._createConnection();
    const [data] = await this.connection.execute(QueryString.UPDATE_CATEGORY, [category.name, category.id]);
    if (data.affectedRows < 1) throw new Error(`Category with id=${category.id} doesn't exist`);
  }

  async deleteCategory(id: Products.ID) {
    await this._createConnection();

    await this.connection.beginTransaction();
    try {
      const [data] = await this.connection.execute(QueryString.DELETE_CATEGORY, [id]);
      if (data.affectedRows < 1) throw new Error(`Category with id=${id} doesn't exist`);
      await this.connection.execute(QueryString.DELETE_CATEGORY_PRODUCTS, [id]);
      await this.connection.commit();
    } catch (error) {
      await this.connection.rollback();
      throw error;
    }
  }
}

export const productsModel = new ProductsModel({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : undefined, // ConnectionOptions requires a port as a number, but process.env.DB_PORT returns a string
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
