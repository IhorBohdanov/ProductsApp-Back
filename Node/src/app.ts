import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import { producstRoute, categoriesRoute } from './routes';

const app: express.Application = express();
app.use(express.json());

app.use('/products', producstRoute);
app.use('/categories', categoriesRoute);

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
