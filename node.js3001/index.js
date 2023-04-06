const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql1',
  user: 'root',
  password: '123456',
  database: 'db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL database is connected.');
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/cliente/tipos', (_req, res) => {
  connection.query('SELECT * FROM tiposdeclientes;', (_err, result) => {
    res.send(result);
  });
});

const port = 3001;
app.listen(port, () => console.log('Express server listening on port ' + port));