namespace Categories {
  export interface ExistingCategory {
    id: number,
    name: string
  }

  export interface NewCategory {
    name: string
  }

  export type ID = number;

  export type Category = ExistingCategory | NewCategory;

  export type CategoriesResult = Array<ExistingCategory>;
}