import express from "express";
import mysql from 'mysql';
import cors from 'cors'; //Para evitar problemas com a proteção dos computadores

const conexao = mysql.createConnection
({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'db'
});

const app = express();
app.use(express.json());
app.use(cors());


conexao.connect(err => {
    if(err) {
        throw err;
    }
    console.log('Conectado')
});

app.get('/cliente/buscar/id/:x', (req,res) => {
    const x = req.params.x;
    const queryString = `SELECT * FROM clientes WHERE idcliente = '${x}' ;`  
    conexao.query(queryString, (err, rows, field) => {
        res.json(rows)
       // console.log(err)
    });
});
 

app.listen(3003, () => {
    console.log('Servidor funcionando...')
});
  