import { bulbeprodutos, getProximoId, tiposEntrega } from '../data/bulbe.js';
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