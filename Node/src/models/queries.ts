export enum QueryString {
  // Products
  GET_PRODUCTS = '',
  ADD_NEW_PRODUCT = 'INSERT INTO products (name,description,price) VALUES (?, ?, ?);',
  GET_PRODUCT_BY_ID = 'select p.id, p.name, p.description, p.price, GROUP_CONCAT(m.category_id) category from products p left outer join product_category_match m on m.product_id = p.id where p.id = ? GROUP BY p.id;',
  UPDATE_PRODUCT = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?;',
  DELETE_PRODUCT = 'DELETE FROM products where id = ?;',
  // Categories
  GET_CATEGORIES = 'SELECT * FROM categories;',
  ADD_CATEGORY = 'INSERT INTO categories (name) VALUES (?);',
  GET_CATEGORY_BY_ID = 'SELECT * from categories where id = ?',
  UPDATE_CATEGORY = 'UPDATE categories SET name = ? WHERE id = ?;',
  DELETE_CATEGORY = 'DELETE FROM categories WHERE id = ?;',
  TRANSACTION_ISOLATION_LEVEL = 'SET TRANSACTION ISOLATION LEVEL READ COMMITTED;',
  // Product category match
  ADD_PRODUCT_CATEGORY = 'INSERT INTO product_category_match (product_id, category_id) VALUES (?,?);',
  DELETE_PRODUCT_CATEGORIES = 'DELETE from product_category_match where product_id = ?;',
  DELETE_CATEGORY_PRODUCTS = 'DELETE from product_category_match where category_id = ?;',
  // Helpers
  GET_LAST_PRODUCT_ID = 'SELECT LAST_INSERT_ID() as id FROM products',
  GET_LAST_CATEGORY_ID = 'SELECT LAST_INSERT_ID() as id FROM categories',
  GET_ROWS_COUNT = 'SELECT FOUND_ROWS() count',
  // Conditions
  OFFSET = 'OFFSET',
  LIMIT = 'LIMIT',
  AND = ' AND ',
  OR = 'OR',
  WHERE = ' WHERE ',
  LIKE = 'LIKE',
  IN = 'IN',
}

export const makeProductsQueryString = ({ query, pagination }: Products.QueryOptions): string => {
  return `select SQL_CALC_FOUND_ROWS p.id, p.name, p.description, p.price, GROUP_CONCAT(m.category_id) category from products p left outer join product_category_match m on m.product_id = p.id ${query} GROUP BY p.id ${pagination};`;
};
