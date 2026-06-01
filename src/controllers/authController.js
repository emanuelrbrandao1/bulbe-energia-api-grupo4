// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import db from '../db/conexao.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/auth.js';

// POST /auth/register
export function register(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(422).json({ mensagem: 'Nome, email e senha são obrigatórios.' });
  }

  const existe = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
  if (existe) {
    return res.status(409).json({ mensagem: 'Email já cadastrado.' });
  }

  const info = db.prepare('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)').run(nome, email, senha);

  const token = jwt.sign(
    { id: info.lastInsertRowid, email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return res.status(201).json({
    token,
    usuarioId: info.lastInsertRowid,
    nome,
    email,
  });
}

// POST /auth/login [US-18]
export function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(422).json({ mensagem: 'Email e senha são obrigatórios.' });
  }

  const usuario = db
    .prepare('SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?')
    .get(email, senha);
  if (!usuario) {
    return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return res.status(200).json({
    token,
    usuarioId: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  });
}
