const express = require ('express')
const app = express()

const produtos = [
    { id: 1, descricao: "Banana Prata 1kg", preco: 8.99},
    { id: 2, descricao: "Leite Integral 1L", preco: 2.99},
    { id: 3, descricao: "Paçoca", preco: 1.99},
]

app.get('/produtos', (req, res) => {
    res.json(produtos)
})

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id);
    
    const index = produtos.findIndex(produto => produto.id === id)
    produtos.splice (index, 1)

    res.json(produtos)
})

const port = 3000
app.listen (port, (e) => {
    console.log('Servidor ouvindo em http://localhost:${port}')
})
