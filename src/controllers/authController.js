// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import { usuarios } from '../data/usuarios.js';

const SEGREDO = 'bulbe-segredo-jwt';
const EXPIRES_IN = '24h';

// POST /auth/login [US-18]
export function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(422).json({ mensagem: 'Email e senha são obrigatórios.' });
  }

  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    SEGREDO,
    { expiresIn: EXPIRES_IN },
  );

  return res.status(200).json({
    token,
    usuarioId: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  });
}
