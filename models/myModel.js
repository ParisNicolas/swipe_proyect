//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");
const { rank } = require("../controllers/myController");

//Creación del Schema de preguntas
const questSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "Una pregunta debe tener un id unico"],
    },
    preg: {
        type: String,
        required: [true, "Como quieres crear una pregunta sin una pregunta"],
    },
    res: {
        type: Boolean,
        required: [true, "Falta la respuesta"],
    },
    img: String,
    alt: String,
    noImage: {
        type: Boolean,
        default: false
    }
});

//Creación del Schema de ranking
const rankSchema = new mongoose.Schema({
    rank: {
        type: Number,
        required: [true, "Una pregunta debe tener un id unico"],
    },
    name: {
        type: String,
        required: [true, "Como quieres crear una pregunta sin una pregunta"],
    },
    results: {
        type: Boolean,
        required: [true, "Falta la respuesta"],
    },
    time: String,
    points: String,
    date: {
        type: Boolean,
        default: false
    }
});


const Ranking = mongoose.model("Ranking", rankSchema);
const Questions = mongoose.model("questions", questSchema);

module.exports = Questions;
