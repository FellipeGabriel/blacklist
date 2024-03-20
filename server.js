const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: '192.168.1.179',
    user: 'cef.trc',
    password: 'Fl@v!@C3fs@2024',
    database: 'caixa'
});


db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Rota para buscar na blacklist
//app.post('/buscar', (req, res) => {
 //   let sql = 'SELECT * FROM blacklist WHERE email = ? OR cpf = ? OR telefone = ?';
   // let values = [req.body.email, req.body.cpf, req.body.telefone];
    //db.query(sql, values, (err, results) => {
      //  if (err) throw err;
       // res.send(results);
   // });
//});

// Inicie o servidor
//app.listen(3000, () => {
  //  console.log('Servidor rodando na porta 3000');
//});