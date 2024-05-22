const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000

const Camisa = mongoose.model('Camisa', {
    time: String,
    numero: Number,
    nome: String,
    ano: Number,
    cor: String
});

app.post('/', async (req, res) => {
    const camisa = new Camisa({
        time: req.body.time,
        numero: req.body.numero,
        nome: req.body.nome,
        ano: req.body.ano,
        cor: req.body.cor
    })

    await camisa.save()
    res.send(camisa)
});

app.put('/:id', async(req, res) => {
    const camisa = await Camisa.findByIdAndUpdate(req.params.id, {
        time: req.body.time,
        numero: req.body.numero,
        nome: req.body.nome,
        ano: req.body.ano,
        cor: req.body.cor
    }, {
        new: true
    })

    return res.send(camisa)
});

app.delete('/:id', async(req, res) => {
    const camisa = await Camisa.findByIdAndDelete(req.params.id)
    return res.send(camisa)
});

app.get('/', async (req, res) => {
    const camisas = await Camisa.find()
    return res.send(camisas)
});

app.listen(port, () => {
    mongoose.connect('mongodb+srv://pedropfpinto:ppAs3spKNF0i9LpI@atividadeavaliativa.4zqusvf.mongodb.net/?retryWrites=true&w=majority&appName=AtividadeAvaliativa');

    console.log('App funcionando')
});