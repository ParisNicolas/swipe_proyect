const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 2500;

let preguntas = [{preg:'¿Las nutrias son mamiferos?', res:true, img:'/images/nutria.png'}, 
                 {preg:'¿Las pulgas muerden?', res:false, img:'/images/pulga.jpg'},
                 {preg:'¿Te gusta la salchipapa?', res:true, img:'/images/salchipapa.jpg'},
                 {preg:'¿Los patos superan a un leon en velocidad?', res:false, img:'/images/pato.jpg'}];

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
    res.render('game', {"preguntas":preguntas, path});
});

app.get('/admin/newQuestion', (req, res) => {
    //res.send('hello ' + req.body.nombre);
    //preguntas.push(req.body);
    res.render('newQuestion');
});

app.post('/admin/newQuestion', (req, res) => {
    preguntas.push(req.body);
    console.log(preguntas);
    res.status(200).send('Pregunta añadida ' + preguntas.length);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

