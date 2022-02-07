namespace Products {
  export interface Product {
    id?: number,
    name: string;
    description: string;
    price: number;
    category: Array<Number>;
  }

  export interface Category {
    id?: number,
    name: string,
  }

  export type ID = number;

  export type ProductsResult = Product[] | Error;
  export interface ProductsResultExtended  {
    data: ProductsResult,
    total?: number
  }
}