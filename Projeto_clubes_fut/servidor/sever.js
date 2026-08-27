const express = require("express")
const clubes = require("../dados.json")

const mostrarClubes = (req, res) => {
    calcularDados()
    res.send(clubes)
}

const novoClube = (req, res) => {
    if (req.body) {

        req.body.id = Number(req.body.id)
        req.body.vitorias = Number(req.body.vitorias)
        req.body.empates = Number(req.body.empates)
        req.body.derrotas = Number(req.body.derrotas)

        clubes.push(req.body)

        res.send("Clube cadastrado com sucesso!")
    } else {
        res.send("Erro ao receber clube")
    }
}

const calcularDados = () => {
    clubes.forEach(c => {
        c.jogos = c.vitorias + c.empates + c.derrotas
        c.pontos = (c.vitorias * 3) + c.empates
    })
}

const app = express()

app.use(express.urlencoded({ extended: true }))

const porta = 3000

app.post("/", novoClube)
app.get("/", mostrarClubes)

app.listen(porta, () => {
    console.log(`Cliente: http://127.0.0.1:5500/cliente/`)
    console.log(`Servidor: http://127.0.0.1:${porta}`)
})