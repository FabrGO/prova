const mysql = require('mysql2')

//Configuração e conexão com banco
const pool = mysql.createPool({
  connectionLimit: 50,
  host: 'localhost',
  port: '3306', // É opcional.
  user: 'root',
  password: 'Sen@iDev77!.',
  database: 'biblioteca',
})

// É necessário exporta esse modulo
exports.module = pool
