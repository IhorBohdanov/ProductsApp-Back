import { check, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';const MIN_PRODUCT_NAME_LENGTH = 3;
const MAX_PRODUCT_NAME_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 100;
const MAX_PRICE_VALUE = 9999;
const MIN_PRICE_VALUE = 1;

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
    return `muts be bigger og equal ${min}`;
  }
};

const messages = {
  required: 'is required',
  isString: 'must be a string',
  isLength: isLength,
  istNumeric: 'must be a number',
  value: value
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
  .withMessage(messages.istNumeric);

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
  .withMessage(messages.istNumeric)
  .custom((value) => value >= MIN_PRICE_VALUE && value <= MAX_PRICE_VALUE)
  .withMessage(messages.value({ min: MIN_PRICE_VALUE, max: MAX_PRICE_VALUE }));


export const addProductCheck = [name, description, price];
export const getProductByIdCheck = [id];
export const updateProductCheck = [id, name, description, price];
export const deleteProductCheck = [id];
export const addCategoryCheck = [name];
export const updateCategoryCheck =  [id, name];
export const deleteCategoryCheck =  [id];

export const catchErrors = (req: Request, res: Response, next: NextFunction) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(400).json(err);

  return next();
}
