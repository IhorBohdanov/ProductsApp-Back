import express from "express";
import mysql from "mysql2"

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM months;';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: 'root',
    database: 'products_app'
})


app.get('/', (req, res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results,
            })
        }
    })
})

app.listen(5000, () => {
    console.log('server running');
})