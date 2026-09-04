const express = require('express');

const app = express();

app.use(express.json());

app.use(express.static('public'));

const produtos = [
    { id: 1,descricao: "Banana Prata 1kg",preco: 8.99,categoria: "Frutas",estoque: 20},
    { id: 2,descricao: "Leite Integral 1L",preco: 2.99,categoria: "Laticinios",estoque: 30},
    { id: 3,descricao: "Pacoca",preco: 1.99,categoria: "Doces",estoque: 50},
    { id: 4,descricao: "Arroz 5kg",preco: 25.90,categoria: "Alimentos",estoque: 15},
    { id: 5, descricao: "Cafe 500g", preco: 18.90, categoria: "Bebidas",estoque: 25}
];

// GET - Listar todos os produtos
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

// GET - Buscar produto por ID
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const produto = produtos.find(produto => produto.id === id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto nao encontrado"
        });
    }

    res.status(200).json(produto);
});

// POST - Cadastrar produto
app.post('/produtos', (req, res) => {
    const novoProduto = {
        id: produtos.length > 0
            ? produtos[produtos.length - 1].id + 1
            : 1,
        descricao: req.body.descricao,
        preco: req.body.preco,
        categoria: req.body.categoria,
        estoque: req.body.estoque
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// PUT - Alterar produto
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const produto = produtos.find(produto => produto.id === id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto nao encontrado"
        });
    }

    produto.descricao = req.body.descricao;
    produto.preco = req.body.preco;
    produto.categoria = req.body.categoria;
    produto.estoque = req.body.estoque;

    res.status(200).json(produto);
});

// DELETE - Excluir produto
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = produtos.findIndex(produto => produto.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Produto nao encontrado"
        });
    }

    produtos.splice(index, 1);

    res.status(204).send();
});

// Porta do servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});