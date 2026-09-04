const formulario = document.getElementById('produto-form');
const listaProdutos = document.getElementById('lista-produtos');

const produtoId = document.getElementById('produto-id');
const descricao = document.getElementById('descricao');
const preco = document.getElementById('preco');
const categoria = document.getElementById('categoria');
const estoque = document.getElementById('estoque');

const tituloFormulario = document.getElementById('titulo-formulario');
const botaoCancelar = document.getElementById('cancelar');


// LISTAR PRODUTOS
async function listarProdutos() {

    const resposta = await fetch('/produtos');

    const produtos = await resposta.json();

    listaProdutos.innerHTML = '';

    produtos.forEach(produto => {

        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.descricao}</td>
            <td>R$ ${Number(produto.preco).toFixed(2)}</td>
            <td>${produto.categoria}</td>
            <td>${produto.estoque}</td>

            <td>
                <button
                    class="btn-editar"
                    onclick="editarProduto(${produto.id})"
                >
                    Editar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})"
                >
                    Excluir
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });
}


// CADASTRAR OU ALTERAR
formulario.addEventListener('submit', async function(event) {

    event.preventDefault();

    const dadosProduto = {

        descricao: descricao.value,

        preco: Number(preco.value),

        categoria: categoria.value,

        estoque: Number(estoque.value)
    };


    // ALTERAÇÃO
    if (produtoId.value) {

        const resposta = await fetch(`/produtos/${produtoId.value}`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(dadosProduto)
        });


        if (resposta.ok) {

            alert('Produto alterado com sucesso!');

            cancelarEdicao();

            listarProdutos();

        } else {

            alert('Erro ao alterar o produto.');
        }

    }

    // CADASTRO
    else {

        const resposta = await fetch('/produtos', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(dadosProduto)
        });


        if (resposta.ok) {

            alert('Produto cadastrado com sucesso!');

            formulario.reset();

            listarProdutos();

        } else {

            alert('Erro ao cadastrar o produto.');
        }
    }

});


// PREPARAR EDIÇÃO
async function editarProduto(id) {

    const resposta = await fetch(`/produtos/${id}`);

    const produto = await resposta.json();


    produtoId.value = produto.id;

    descricao.value = produto.descricao;

    preco.value = produto.preco;

    categoria.value = produto.categoria;

    estoque.value = produto.estoque;


    tituloFormulario.textContent = 'Editar Produto';

    botaoCancelar.style.display = 'block';
}


// CANCELAR EDIÇÃO
function cancelarEdicao() {

    formulario.reset();

    produtoId.value = '';

    tituloFormulario.textContent = 'Cadastrar Produto';

    botaoCancelar.style.display = 'none';
}


// EXCLUIR
async function excluirProduto(id) {

    const confirmar = confirm(
        'Deseja realmente excluir este produto?'
    );


    if (!confirmar) {
        return;
    }


    const resposta = await fetch(`/produtos/${id}`, {

        method: 'DELETE'
    });


    if (resposta.ok || resposta.status === 204) {

        alert('Produto excluído com sucesso!');

        listarProdutos();

    } else {

        alert('Erro ao excluir o produto.');
    }
}


// CARREGAR PRODUTOS AO ABRIR A PÁGINA
listarProdutos();