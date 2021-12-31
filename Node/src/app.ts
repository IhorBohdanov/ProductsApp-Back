import express from 'express';
var cors = require('cors');

import dotenv from 'dotenv';
dotenv.config();

import { producstRoute, categoriesRoute } from './routes';

const app: express.Application = express();
app.use(
  cors(),
  express.json()
);

app.use('/products', producstRoute);
app.use('/categories', categoriesRoute);

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
