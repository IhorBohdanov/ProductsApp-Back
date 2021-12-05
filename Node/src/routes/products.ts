import express from 'express';
import { productsController } from '../controllers';

const router: express.Router = express.Router();

// const User = require('../models/user')
// const bcrypt = require('bcrypt')
// const rounds = 10

// const jwt = require('jsonwebtoken')
// const tokenSecret = process.env.TOKEN_SECRET

// const middleware = require('../middlewares')

router.get('/', async (req: express.Request, res: express.Response) => {
  res.json({ data: await productsController.getProducts() });
});

router.post('/', async (req: express.Request, res: express.Response) => {
  res.json({ data: await productsController.addProduct() });
});

export const producstRoute = router;
