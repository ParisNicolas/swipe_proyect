const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 2500;

let preguntas = [{preg:'¿Las nutrias son mamiferos?', res:true}, 
                 {preg:'¿Las pulgas muerden?', res:false},
                 {preg:'¿Te gusta la salchipapa?', res:true},
                 {preg:'¿Los patos superan a un leon en velocidad?', res:false}];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* MIDDLEWARES */
app.use(morgan('dev'));
app.use(express.json());

//Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/MacacoPlaying', (req, res) => {
    res.render('game', {"preguntas":preguntas});
});

app.post('/administracion/pregunta', (req, res) => {
    res.send('Hello ' + req.body.nombre);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

