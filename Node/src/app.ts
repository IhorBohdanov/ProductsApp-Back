import express from "express";
import mysql from "mysql2"

import { producstRoute, categoriesRoute} from "./routes"
const app: express.Application = express();
app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: 'root',
    database: 'products_app'
})


app.use('/products', producstRoute)
app.use('/products', categoriesRoute)


app.listen(5000, () => {
    console.log('server running');
})