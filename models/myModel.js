//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");

//Creación del Schema Post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Un post debe tener un título"],
    },
    description: {
        type: String,
        required: [true, "Un post debe tener una descripción"],
    },
    date: {
        type: Date,
        required: [true, "Un post debe tener una fecha"],
    },
    technologies: {
        type: [String],
        required: [true, "Un post debe contar con tecnologías"],
    },
});

//Creación del Schema de preguntas
const questSchema = new mongoose.Schema({
    id: {
        type: Number,
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

//Creación del Schema Post
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

//Creación del modelo Post
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
