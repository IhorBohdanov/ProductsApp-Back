namespace Products {
  export interface Product {
    id?: number,
    name: string;
    description: string;
    price: number;
    category: Array<number>;
  }

  export interface ProductRaw {
    id?: number,
    name: string;
    description: string;
    price: number;
    category: string;
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

  export interface Filters {
    minPrice: number,
    maxPrice: number,
    search: string,
    category: string,
    page: number,
    pageSize: number
  }

  export interface FiltersResult {
    query: string,
    pagination: string, 
  }

  export interface QueryOptions {
    query: string,
    pagination: string,
  }
}