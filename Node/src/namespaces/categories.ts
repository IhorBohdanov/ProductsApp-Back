export namespace Categories {
  interface ExistingCategory {
    id: number,
    name: string
  }

  interface NewCategory {
    name: string
  }

  export type Category = ExistingCategory | NewCategory;
}