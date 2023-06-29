//const OneModel = require('../models/myModel');
//const moment = require('moment');

//Funcion para colocar sufijo a las posicines y crear objeto 
let makerRankingObj = (pos, points, resultsText, time, name) => {
    let rankText;
    let obj;
    switch (pos) {
        case 1:
            rankText = pos + 'st';
        break;
        case 2:
            rankText = pos + 'nd';
        break;
        case 3:
            rankText = pos + 'rd';
        break;
        default:
            rankText = pos + 'th';
        break;
    }

    obj = {
        rank: rankText, 
        name: name, 
        results: resultsText, 
        time: time + ' s',
        points: points
    };

    return obj
}

//Renderizar la pagina de bienvenida
exports.home = (req, res) => {
    res.render('home');
};

//Renderizar el juego
exports.game = (req, res) => {
    res.render('game', {"preguntas":preguntas, "ranking":ranking});
};

//Procesar el puntaje del jugador y hubicar en el ranking
exports.rank = (req, res) => {
    //Obtener datos
    let time = req.body.time;
    let results = req.body.results;
    let resultsText = req.body.resultsText;
    let name = req.params.name;

    //Calcular puntaje
    let points = (results*1000)/time;
    
    //Ubicar en el ranking
    if(points > ranking[ranking.length-1].points){
        let pos = 0;

        while (pos < ranking.length && points < ranking[pos].points) {
            pos++;
        }

        ranking.splice(pos, 0, makerRankingObj(pos, points, resultsText, time, name));

        if (ranking.length > 10) {
            ranking.pop();
        }
    }
    
    res.status(200).send('Nuevo ranking');
};