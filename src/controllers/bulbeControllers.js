import db from '../db/conexao.js';
//Remover item dos favoritos [US-11]
export const removerFavoritos = (req,res)=>{
    const id = parseInt(req.params.id,10);
    if(isNaN(id)){
        return res.status(400).json({
            erro:`O id deve ser um número`
        });
    }
    const resultado = db.prepare(`DELETE FROM favoritos WHERE produto_id = ?`).run(id);

    if (resultado.changes === 0) {
        return res.status(404).json({ 
            erro: `O produto com id ${id} não está nos favoritos` 
        });
    }

    return res.status(204).send();
};

//Selecionar a forma de pagamento[US-14]
export const selecionarEntrega = (req, res) => {
    const { tipo } = req.body;

    if (!tipo || !tiposEntrega[tipo]) {
        return res.status(422).json({
            erro: `Tipo de entrega inválido`
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

    const {metodo,nome_titular,num_cartao,validade,cod_seguranca} = req.body;
    const idPedido = parseInt(req.params.id,10);

    if(isNaN(idPedido)){
        return res.status(400).json({
            erro:`Id do pedido inválido`
        });
    }

   const pedido = db.prepare(`SELECT * FROM pedidos WHERE id = ?`).get(idPedido);
    if (!pedido) {
        return res.status(404).json({ 
            erro: `Pedido com id ${idPedido} não encontrado` 
        });
    }

    const metodosComCartao = ['credito', 'debito', 'cartao_credito', 'cartao_debito'];
    const metodosValidos   = ['pix', ...metodosComCartao];
 
    if (!metodo || !metodosValidos.includes(metodo)) {
        return res.status(422).json({ erro: `Método de pagamento inválido` });
    }
 
    if (metodosComCartao.includes(metodo)) {
        if (!nome_titular || !num_cartao || !validade || !cod_seguranca) {
            return res.status(422).json({ erro: `Dados do cartão obrigatórios faltando` });
        }
    }
 
    const dados = metodosComCartao.includes(metodo)
        ? JSON.stringify({ nome_titular, num_cartao, validade, cod_seguranca })
        : null;
 
    const resultado = db.prepare(`
        INSERT INTO pagamentos (pedido_id, metodo, status, dados)
        VALUES (?, ?, 'aprovado', ?)
    `).run(idPedido, metodo, dados);
 
    const pagamento = {
    idPedido,
    metodo,
    status: 'aprovado',
    };

    
    return res.status(200).json(pagamento);

};
//Rastrear pedido[US-20]
export const rastrearPedido = (req,res) => {
    const pedidoId = parseInt(req.params.pedidoId, 10);
    if(isNaN(pedidoId)){
        return res.status(400).json({
            erro:`O id deve ser um número.`
        });
    }

    const pedido = db.prepare(`SELECT * FROM pedidos WHERE id = ?`).get(pedidoId);
    if (!pedido) {
        return res.status(404).json({ erro: `Pedido não encontrado.` });
    }
 
    return res.status(200).json(pedido);

};