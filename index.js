const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { connectionString } = require("pg/lib/defaults");
require('dotenv').config()
const Pool = require('pg').Pool
//const connectionString = process.env.DB

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL    
  })

   const getUsuario = (request, response) => {
    pool.query('SELECT * FROM usuarios ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const crearUsuario = (request, response) => {
    const { nombre,edad,tipo } = request.body
    
    console.log("Nombre:", nombre, "edad:", edad, "tipo:", tipo)
    pool.query('insert into usuarios (nombre,edad,tipo) values ($1, $2, $3)', [nombre,edad,tipo], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({ UsuarioAgregado: 'Ok' })
    })
  }

  app.get('/', function (req, res) {
    res.json({ Resultado: 'Bienvenido al Taller Despliegue NodeJs y Postgres - Render' })
  });

  app.get('/usuarios', getUsuario)
  app.post('/usuarios', crearUsuario)
  
const port = process.env.PORT || 1337;

app.listen(port, () => {
 console.log("El servidor está inicializado en http://localhost:%d", port);
});
