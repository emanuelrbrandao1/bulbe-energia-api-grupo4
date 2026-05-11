// Buscar produto por ID [US-02]
export const buscarProdutoPorId = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'O parâmetro "id" deve ser um número inteiro.' });
  }

  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: `Produto com id ${id} não encontrado.` });
  }

  return res.status(200).json(produto);
};