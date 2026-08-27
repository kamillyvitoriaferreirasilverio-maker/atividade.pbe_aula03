const express = require("express")
const consultas = require("../dados.json")

const mostrarConsultas = (req, res) => {
    calcularIMC()
    res.send(consultas)
}

const novaConsulta = (req, res) => {
    if (req.body) {
        consultas.push(req.body)
        res.send("Consulta recebida, em análise")
    } else {
        res.send("Erro ao receber consulta")
    }
}

const calcularIMC = () => {
    consultas.forEach(p => {
        p.imc = p.peso / (p.altura * p.altura)
        p.imc = Number(p.imc.toFixed(2))
    })
}

const app = express()
app.use(express.urlencoded({ extended: true }))

const porta = 3000

app.post("/", novaConsulta)
app.get("/", mostrarConsultas)

app.listen(porta, () => {
    console.log(`Cliente: http://127.0.0.1:5500/cliente/`)
    console.log(`Servidor: http://127.0.0.1:${porta}`)
})