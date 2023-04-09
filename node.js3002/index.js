const connection = require('./db');
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const multer  = require('multer')
const upload = multer();


const port = 3002;


app.use(express.json());
app.use(cors());

app.post('/cliente/gravar', upload.any(), (req, res) => {
    const {nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, idtipo_cliente } = req.body;
   
    const sql = 'INSERT INTO clientes (nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, idtipo_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [ nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, idtipo_cliente], (err, result) => {
      if (err) {
        console.log(`Erro ao inserir dados no banco de dados: ${err.message}`);
        res.status(500).send('Erro interno do servidor');
      } else {
        console.log(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
        res.status(200).send(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
      }
    });
  });
  app.listen(port);
  console.log('API funcionando!');
  
  function execSQLQuery(sqlQry, res){
      const connection = mysql.createConnection({
        host     : 'atvmysql',
        port     : 3306,
        user     : 'user1',
        password : '123456',
        database : 'atv1403'
      });
     
      connection.query(sqlQry, (error, results, fields) => {
          if(error)
            res.json(error);
          else
            res.json(results);
          connection.end();
          console.log('executou!');
      });
  }
  