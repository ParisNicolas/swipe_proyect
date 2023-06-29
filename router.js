//Importando las variables de preguntas y ranking
const {preguntas, ranking} = require('./data');
//Haciendo las variables globales
global.preguntas = preguntas;
global.ranking = ranking;
//Importando modulos y controladores
const myController = require('./controllers/myController');
const adminController = require('./controllers/adminController');
const express = require('express');
const router = express.Router();


//Pantalla principal
router.route('/').get(myController.home);

//Juego tal cual
router.route('/MacacoPlaying').get(myController.game);

//Colocar persona en el ranking
router.route('/ranking/:name').post(myController.rank);

//Administracion
router.route('/admin').get(adminController.adminPanel);

//Reordenamiento de la lista
router.route('/admin').post(adminController.reorderPregs);

//Eliminacion de pregunta
router.route('/admin/remove/ID-:pregId').delete(adminController.deletePreg);

//Administracion de nuevas preguntas
router.route('/admin/newQuestion').put(adminController.newQuest);

// Modificar la pregunta
router.route('/admin/modify/ID-:pregId').post(adminController.modifyQuest);


module.exports = router;