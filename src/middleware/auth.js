// src/middleware/auth.js
import jwt from 'jsonwebtoken';

export const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token JWT ausente ou inválido.' });
  }

  const token = authHeader.slice('Bearer '.length).trim();

  try {
    const decoded = jwt.verify(token, 'bulbe-segredo-jwt');
    req.usuario = { id: decoded.id, email: decoded.email };
    return next();
  } catch (err) {
    const mensagem = err.name === 'TokenExpiredError'
      ? 'Token JWT expirado.'
      : 'Token JWT inválido.';
    return res.status(401).json({ erro: mensagem });
  }
};
