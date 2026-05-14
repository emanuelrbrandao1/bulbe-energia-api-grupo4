import { bulbeprodutos, getProximoId, tiposEntrega, formasPagamento, pagamentos } from '../data/bulbe.js';
//Remover item dos favoritos [US-11]
export const removerFavoritos = (req,res)=>{
    const id = parseInt(req.params.id,10);
    if(isNaN(id)){
        return res.status(400).json({
            erro:`O id deve ser um número`
        });
    }
    const index = bulbeprodutos.findIndex((produto)=> produto.id === id);
    if(index === -1){
        return res.status(404).json({
            erro:`O produto com id ${id} não está nos favoritos` 
        });
    }
    bulbeprodutos.splice(index, 1);
    res.status(204).send();
};

//Selecionar a forma de pagamento[US-14]
export const selecionarEntrega = (req, res) => {
    const { tipo } = req.body;

    if (!tipo || !tiposEntrega[tipo]) {
        return res.status(422).json({
            erro: "Tipo de entrega inválido"
        });
    }

    const entrega = {
        tipo,
        ...tiposEntrega[tipo]
    };

    return res.status(200).json(entrega);
};
//Processar pagamento do pedido[US-15]
export const processarPagamento = (req,res) => {

    const {metodo,nome_titular,num_cartao,validade,cvv} = req.body;
    const idPedido = parseInt(req.params.id,10);

    if(isNaN(idPedido)){
        return res.status(400).json({
            erro:"Id do pedido inválido"
        });
    }

    const formaPagamento = formasPagamento.find((forma) => forma.tipo === metodo);

    if(!formaPagamento){
        return res.status(422).json({
            erro:"Método de pagamento inválido"
        });
    }

    if(formaPagamento.precisaCartao === true){
        if(!nome_titular || !num_cartao || !validade || !cvv){
            return res.status(422).json({
                erro:"Dados do cartão obrigatórios faltando"
            });
        }
    }

    // simulação aprovação
    const status = "aprovado";

    const pagamento = {
        idPedido,
        metodo,
        status
    };

    pagamentos.push(pagamento);

    return res.status(200).json(pagamento);
};