// src/controllers/jControllers.js
import {
  salvarEnderecoNoBanco,
  verificarProdutoExiste,
  adicionarFavoritoNoBanco,
  buscarCepNoViaCep,
} from '../data/j.js';

// POST /pedidos/endereco [US-13]
export const salvarEndereco = (req, res) => {
  const { cep, logradouro, numero } = req.body;
  const usuarioId = req.usuario?.id;

  if (!usuarioId) return res.status(401).json({ erro: 'Não autorizado' });
  if (!cep || !logradouro || !numero) {
    return res.status(422).json({ erro: 'Campos obrigatórios ausentes' });
  }

  const endereco = salvarEnderecoNoBanco(usuarioId, req.body);
  return res.status(201).json({ mensagem: 'Endereço salvo', endereco });
};

// POST /favoritos [US-10]
export const favoritarProduto = (req, res) => {
  const { produtoId } = req.body;
  const usuarioId = req.usuario?.id;

  if (!usuarioId) return res.status(401).json({ erro: 'Exige JWT' });
  if (!verificarProdutoExiste(produtoId)) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  const resultado = adicionarFavoritoNoBanco(usuarioId, produtoId);
  return res
    .status(resultado.status)
    .json({ mensagem: 'Favoritos atualizados', favoritos: resultado.lista });
};

// GET /enderecos/cep/:cep [US-12]
export const consultarCep = async (req, res) => {
  try {
    const { cep } = req.params;
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return res.status(422).json({ erro: 'CEP inválido. Deve conter 8 dígitos.' });
    }

    const endereco = await buscarCepNoViaCep(cepLimpo);
    if (!endereco) {
      return res.status(404).json({ erro: 'CEP não encontrado.' });
    }

    return res.status(200).json(endereco);
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({ erro: 'Tempo de busca excedido (timeout 5s).' });
    }
    return res.status(500).json({ erro: 'Erro ao consultar CEP.' });
  }
};
