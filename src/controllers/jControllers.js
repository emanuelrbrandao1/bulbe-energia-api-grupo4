// src/controllers/jControllers.js
import db from '../db/conexao.js';

// POST /pedidos/endereco [US-13]
export const salvarEndereco = (req, res) => {
  const { cep, logradouro, numero } = req.body;
  const usuarioId = req.usuario?.id;

  if (!usuarioId) return res.status(401).json({ erro: 'Não autorizado' });
  if (!cep || !logradouro || !numero) {
    return res.status(422).json({ erro: 'Campos obrigatórios ausentes' });
  }

  // Insere o endereço no banco de dados usando parâmetros nomeados (@campo) para evitar SQL Injection
  const stmtInsert = db.prepare(`
    INSERT INTO enderecos (usuario_id, cep, logradouro, numero, complemento, bairro, localidade, uf)
    VALUES (@usuarioId, @cep, @logradouro, @numero, @complemento, @bairro, @localidade, @uf)
  `);

  const resultadoInsert = stmtInsert.run({
    usuarioId,
    cep,
    logradouro,
    numero,
    complemento: req.body.complemento || null,
    bairro: req.body.bairro || null,
    localidade: req.body.localidade || null,
    uf: req.body.uf || null
  });

  // Busca o endereço recém-criado para retornar no mesmo formato de contrato anterior
  const enderecoSalvo = db.prepare('SELECT * FROM enderecos WHERE id = ?').get(resultadoInsert.lastInsertRowid);

  return res.status(201).json({ mensagem: 'Endereço salvo', endereco: enderecoSalvo });
};

// POST /favoritos [US-10]
export const favoritarProduto = (req, res) => {
  const { produtoId } = req.body;
  const usuarioId = req.usuario?.id;

  if (!usuarioId) return res.status(401).json({ erro: 'Exige JWT' });

  // Verifica se o produto existe na tabela de produtos antes de prosseguir
  const produtoExiste = db.prepare('SELECT id FROM produtos WHERE id = ?').get(produtoId);
  if (!produtoExiste) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  // Verifica se já está favoritado para saber se deve adicionar ou remover (comportamento de alternância/toggle comum em listas de favoritos)
  const favoritoExistente = db.prepare(`
    SELECT id FROM favoritos WHERE usuario_id = @usuarioId AND produto_id = @produtoId
  `).get({ usuarioId, produtoId });

  let statusHttp = 201;

  if (favoritoExistente) {
    // Se já existia, remove dos favoritos
    db.prepare(`
      DELETE FROM favoritos WHERE usuario_id = @usuarioId AND produto_id = @produtoId
    `).run({ usuarioId, produtoId });
    statusHttp = 200; // Ok / Atualizado
  } else {
    // Se não existia, adiciona
    db.prepare(`
      INSERT INTO favoritos (usuario_id, produto_id) VALUES (@usuarioId, @produtoId)
    `).run({ usuarioId, produtoId });
    statusHttp = 201; // Criado
  }

  const listaFavoritosAtualizada = db.prepare(`
    SELECT f.produto_id AS produtoId, p.nome, p.imagem, p.preco
    FROM favoritos f
    JOIN produtos p ON p.id = f.produto_id
    WHERE f.usuario_id = ?
  `).all(usuarioId);

  return res
    .status(statusHttp)
    .json({ mensagem: 'Favoritos atualizados', favoritos: listaFavoritosAtualizada });
};

// GET /enderecos/cep/:cep [US-12]
export const consultarCep = async (req, res) => {
  try {
    const { cep } = req.params;
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return res.status(422).json({ erro: 'CEP inválido. Deve conter 8 dígitos.' });
    }

    // Mantido estritamente como Proxy para a API externa ViaCEP (Conforme a foto 2: "não toca no banco")
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`, { signal: AbortSignal.timeout(5000) });
    
    if (!resposta.ok) {
      return res.status(404).json({ erro: 'CEP não encontrado.' });
    }

    const endereco = await resposta.json();
    if (endereco.erro) {
      return res.status(404).json({ erro: 'CEP não encontrado.' });
    }

    return res.status(200).json(endereco);
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return res.status(504).json({ erro: 'Tempo de busca excedido (timeout 5s).' });
    }
    return res.status(500).json({ erro: 'Erro ao consultar CEP.' });
  }
};