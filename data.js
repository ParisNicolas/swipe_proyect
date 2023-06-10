let preguntas = [{id: '0', preg:'¿Las nutrias son mamiferos?', res:true, img:'assets/images/nutria.png', alt: 'nutria', noImage: false}, 
                 {id: '1', preg:'¿Las pulgas muerden?', res:false, img:'assets/images/pulga.jpg', alt: 'pulga', noImage: false},
                 {id: '2', preg:'¿Te gusta la salchipapa?', res:true, img:'assets/images/salchipapa.jpg', alt: 'salchipapa', noImage: false},
                 {id: '3', preg:'¿Los patos superan a un leon en velocidad?', res:false, img:'assets/images/pato.jpg', alt: 'pato', noImage: false}];

let ranking = [{rank: '1st', name: 'John Doe', results: '5/7', time: '14.3s', points: 50.0},
               {rank: '2nd', name: 'Jane Doe', results: '3/7', time: '18.7s', points: 22.0},
               {rank: '3rd', name: 'Bob Smith', results: '2/7', time: '20.0s', points: 14.0}];


module.exports = {ranking, preguntas};