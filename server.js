const cookieparser = require('cookie-parser') //`cookie-parser` que nos va a permitir justamente parsear los datos de la cookie enviada dentro del header de los request HTTP y agregarlo dentro del objeto `req`, particularmente en un atributo llamado `req.cookies`.
const express = require('express');
const morgan = require('morgan');

const app = express();

const users = [
  {id: 1, name: 'admin', email: 'admin@admin.com', password: '1111'},
  {id: 2, name: 'web', email: 'web@web.com', password: '1111'}
]

app.use(morgan('dev'));
app.use(cookieparser());

app.get('/', (req, res) => {
  res.send(`
    <h1>Home</h1>
  `)
});

app.listen(3000, (err) => {
  if(err) {
   console.log(err);
 } else {
   console.log('Listening on localhost:3000');
 }
});

//Para poder hacer un seguimiento de la cookie y los datos almacenados en ella vamos a definir un middleware que será ejecutado previo a cada request recibido por el servidor:

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

//PRIMERO INICIO Y REGISTRO

app.get('/', (req, res) => {
  res.send(`
    
    <h1> Bienvenido al Sitio </h1>
    
    ${req.cookies.userID 
    ? 
    `<a ref= '/home> Perfil Usuario </a>
    <form method= 'post' action ='/logout'>
    <button> Salir </button>
    </form> 
    ` : `
    <a ref='/login'> Entrar </a>
    <a ref='/register'> Registro </a>
    `}    
    `)
});