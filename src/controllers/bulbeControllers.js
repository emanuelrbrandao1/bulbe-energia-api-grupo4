import { bulbeprodutos, getProximoId } from '../data/bulbe.js';

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