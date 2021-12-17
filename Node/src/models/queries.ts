export enum QueryString {
  // Products
  GET_PRODUCTS = 'SELECT * FROM products;',
  ADD_NEW_PRODUCT = 'INSERT INTO products (name,description,price) VALUES (?, ?, ?);',
  GET_PRODUCT_BY_ID = 'SELECT * FROM products where id = ?;',
  UPDATE_PRODUCT = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?;',
  DELETE_PRODUCT = 'DELETE FROM products where id = ?;',
  // Categories
  GET_CATEGORIES = 'SELECT * FROM categories;',
  ADD_CATEGORY = 'INSERT INTO categories (name) VALUES (?);',
  UPDATE_CATEGORY = 'UPDATE categories SET name = ? WHERE id = ?;',
  DELETE_CATEGORY = 'DELETE FROM categories WHERE id = ?;',
}
