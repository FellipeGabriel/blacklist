const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Importe o módulo 'cors'
const bodyParser = require('body-parser');

const app = express();

// Configuração do CORS para permitir qualquer origem (não recomendado para produção)
app.use(cors()); // Use o middleware 'cors'

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

const moment = require('moment'); 

app.get('/blacklist/search', (req, res) => {
  const email = req.query.email;
  const cpf = req.query.cpf;
  const telefone = req.query.telefone;
  const dataInclusao = req.query.dataInclusao; 

  let query = 'SELECT CONCAT(a.ddd, a.telefone) as telefone, a.data_insercao FROM blacklist a WHERE 1=1';
  if (email) query += ` AND a.email = '${email}'`;
  if (cpf) query += ` AND a.cpf = '${cpf}'`;
  if (telefone) query += ` AND CONCAT(a.ddd, a.telefone) = '${telefone}'`;

  if (dataInclusao) {
    const startOfDay = moment(dataInclusao).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const endOfDay = moment(dataInclusao).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    query += ` AND a.data_insercao BETWEEN '${startOfDay}' AND '${endOfDay}'`;
  }
  
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/blacklist', (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  db.query('SELECT COUNT(*) as total FROM blacklist', (err, result) => {
    if (err) throw err;

    const total = result[0].total;
    const totalPages = Math.ceil(total / pageSize);

    const query = `SELECT CONCAT(a.ddd, a.telefone) as telefone, a.data_insercao FROM blacklist a LIMIT ${pageSize} OFFSET ${offset}`;
    db.query(query, (err, result) => {
      if (err) throw err;
      res.json({clients: result, totalPages});
    });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
