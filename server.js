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

//const sql = require('mssql')

//const config = {
    //user: 'dduro',
    //password: 'dd2014@)!$',
    //server: 'trc-dc-bd1', 
    //database: 'SRC',
//}

//sql.connect(config).then(pool => {
    //return pool.request()
      //.query('SELECT DISTINCT T.COD_PAUSA, O.NOME_RECUP, T.INICIO_PAUSA, T.FIM_PAUSA, F.SUPERVISOR, F.EMAIL_SUPERVISOR FROM TBL_SOLICITAPAUSA AS T INNER JOIN AUX_DADOS_OPERADORES_CEF AS O ON T.COD_RECUP = O.COD_RECUP INNER JOIN FUNCIONARIO_SUPERVISOR AS F ON O.NOME_RECUP = F.NOME WHERE T.COD_PAUSA IN (8, 9, 11) AND CAST(T.DATA_PAUSA AS DATE) = CAST(GETDATE() AS DATE) AND (DATEDIFF(MINUTE, T.INICIO_PAUSA, T.FIM_PAUSA) < 10 OR T.FIM_PAUSA IS NULL) AND T.INICIO_PAUSA BETWEEN DATEADD(MINUTE, -140, GETDATE()) AND DATEADD(MINUTE, -20, GETDATE())ORDER BY T.INICIO_PAUSA ASC')
//}).then(result => {
    //console.log(result)
//}).catch(err => {
    //console.error(err)
//})