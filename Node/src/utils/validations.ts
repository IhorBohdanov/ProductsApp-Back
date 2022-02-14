import { check, query, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express'; const MIN_PRODUCT_NAME_LENGTH = 3;
const MAX_PRODUCT_NAME_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 100;
const MAX_SEARCH_LENGTH = 20;
const MAX_PRICE_VALUE = 9999;
const MIN_PRICE_VALUE = 1;
const MIN_PAGE_VALUE = 1;
const MIN_PAGE_SIZE_VALUE = 1;
const MAX_PAGE_SIZE_VALUE = 100;
const CATEGORY_QUERY_SEPARATOR = ',';

interface lengthParams {
  min?: number,
  max?: number
}

const isLength = ({ min, max }: lengthParams) => {
  if (min && max) {
    return `must contain from ${min} to ${max} characters`;
  }

  if (min) {
    return `must contain at least ${min} characters`;
  }

  if (max) {
    return `must contain up to ${max} characters`;
  }
};

const value = ({ min, max }: lengthParams) => {
  if (min && max) {
    return `value must be between ${min} and ${max}`;
  }

  if (max) {
    return `must be less or equal ${max}`;
  }

  if (min) {
    return `muts be bigger or equal ${min}`;
  }
};

const messages = {
  required: 'is required',
  isString: 'must be a string',
  isLength: isLength,
  isNumeric: 'must be a number',
  isArray: 'must be an array',
  isEmptyArray: 'must contain at least 1 value',
  isNumberArray: 'must contains only number values',
  value: value,
  isStringWithNumbers: 'must be a string with (,) separator',
  pageSkip: 'must be provided with page param',
  pageSizeSkip: 'must be provided with pageSize param'
};

const name = check('name')
  .exists()
  .withMessage(messages.required)
  .bail()
  .isString()
  .withMessage(messages.isString)
  .isLength({ min: MIN_PRODUCT_NAME_LENGTH, max: MAX_PRODUCT_NAME_LENGTH })
  .withMessage(messages.isLength({ min: MIN_PRODUCT_NAME_LENGTH, max: MAX_PRODUCT_NAME_LENGTH }));

const id = param('id')
  .exists()
  .withMessage(messages.required)
  .bail()
  .isNumeric()
  .withMessage(messages.isNumeric);

const description = check('description')
  .exists()
  .withMessage(messages.required)
  .bail()
  .isString()
  .withMessage(messages.isString)
  .isLength({ max: MAX_DESCRIPTION_LENGTH })
  .withMessage(messages.isLength({ max: MAX_DESCRIPTION_LENGTH }));

const price = check('price')
  .exists()
  .withMessage(messages.required)
  .bail()
  .isNumeric()
  .withMessage(messages.isNumeric)
  .custom((value: number) => value >= MIN_PRICE_VALUE && value <= MAX_PRICE_VALUE)
  .withMessage(messages.value({ min: MIN_PRICE_VALUE, max: MAX_PRICE_VALUE }));

const categories = check('category')
  .exists()
  .withMessage(messages.required)
  .bail()
  .isArray()
  .withMessage(messages.isArray)
  .bail()
  .custom((value: Array<number>) => value.length > 0)
  .withMessage(messages.isEmptyArray)
  .custom((value: Array<number>) => !value.find((item: number) => typeof item !== 'number'))
  .withMessage(messages.isNumberArray);

const queryPrice = query(['minPrice', 'maxPrice'])
  .optional()
  .isNumeric()
  .withMessage(messages.isNumeric)
  .bail()
  .custom((value: number) => value >= MIN_PRICE_VALUE && value <= MAX_PRICE_VALUE)
  .withMessage(messages.value({ min: MIN_PRICE_VALUE, max: MAX_PRICE_VALUE }));

const queryCategory = query('category')
  .optional()
  .isString()
  .withMessage(messages.isString)
  .bail()
  .custom((value: string) => value.split(CATEGORY_QUERY_SEPARATOR).length)
  .withMessage(messages.isStringWithNumbers)
  .bail()
  .custom((value: string) => !value.split(CATEGORY_QUERY_SEPARATOR).find((item: any) => !Number(item) ))
  .withMessage(messages.isStringWithNumbers);

const querySearch = query('search')
  .optional()
  .isString()
  .withMessage(messages.isString)
  .bail()
  .isLength({ max: MAX_SEARCH_LENGTH })
  .withMessage(messages.isLength({ max: MAX_SEARCH_LENGTH }));

const queryPage = query('page')
  .optional()
  .isNumeric()
  .withMessage(messages.isNumeric)
  .bail()
  .custom((value: number, {req}: any) => req.query.pageSize)
  .withMessage(messages.pageSizeSkip)
  .bail()
  .isLength({ max: MAX_SEARCH_LENGTH })
  .custom((value: number) => value >= MIN_PAGE_VALUE)
  .withMessage(messages.value({ min: MIN_PAGE_VALUE }));

const queryPageSize = query('pageSize')
  .optional()
  .isNumeric()
  .withMessage(messages.isNumeric)
  .bail()
  .custom((value: number, {req}: any) => req.query.page)
  .withMessage(messages.pageSkip)
  .bail()
  .custom((value: number) => value >= MIN_PAGE_SIZE_VALUE && value <= MAX_PAGE_SIZE_VALUE)
  .withMessage(messages.value({ min: MIN_PAGE_SIZE_VALUE, max: MAX_PAGE_SIZE_VALUE }));

export const getProductCheck = [queryPrice, queryCategory, querySearch, queryPage, queryPageSize];
export const addProductCheck = [name, description, price, categories];
export const getProductByIdCheck = [id];
export const updateProductCheck = [id, name, description, price];
export const deleteProductCheck = [id];
export const addCategoryCheck = [name];
export const updateCategoryCheck = [id, name];
export const deleteCategoryCheck = [id];

export const catchErrors = (req: Request, res: Response, next: NextFunction) => {
  const err = validationResult(req);
  const response = {
    success: false,
    ...err,
  };
  if (!err.isEmpty()) return res.status(400).json(response);

  return next();
};
