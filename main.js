let express = require('express');
let app = express();
app.use(express.json());

// Array para salvar os pedidos
let banco = [];

// Rota para criar o pedido
app.post('/order', function(req, res) {
    console.log("Chamou a rota de criar");
    
    let dados = req.body;
    
    if (dados.numeroPedido == null) {
        res.send("Erro: É necessário enviar o número do pedido");
        return;
    }

    // Criando a nova lista de itens
    let itensParaSalvar = [];

    for (let i = 0; i < dados.items.length; i++) {
        let itemAtual = dados.items[i];
        
        let obj = {
            productId: parseInt(itemAtual.idItem),
            quantity: itemAtual.quantidadeItem,
            price: itemAtual.valorItem
        };
        
        itensParaSalvar.push(obj);
    }

    // Objeto final com os nomes em inglês
    let pedidoFinal = {
        orderId: dados.numeroPedido,
        value: dados.valorTotal,
        creationDate: dados.dataCriacao,
        items: itensParaSalvar
    };

    banco.push(pedidoFinal); // Salva o pedido final no Array
    
    console.log("Salvou o pedido: " + pedidoFinal.orderId);

    res.json(pedidoFinal);
});

// Rota para pegar o pedido pelo ID

app.get('/order/:id', function(req, res) {
    let idProcurado = req.params.id;
    let achei = false;
    let pedidoEncontrado = null;

    // Procura no Array

    for (let i = 0; i < banco.length; i++) {
        if (banco[i].orderId == idProcurado) {
            pedidoEncontrado = banco[i];
            achei = true;
        }
    }

    // Caso não encontrar, retorna uma mensagem
    if (achei == true) {
        res.json(pedidoEncontrado);
    } else {
        res.send("Pedido não encontrado"); 
    }
});

// sobe o servidor
app.listen(3000, function() {
    console.log("Servidor rodando...");
});