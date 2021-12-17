namespace Products {
  export interface Product {
    id?: number,
    name: string;
    description: string;
    price: number;
  }

  export interface Category {
    id?: number,
    name: string,
  }

  export type ID = number;

  export type ProductsResult = Array<Product> | Error;
}