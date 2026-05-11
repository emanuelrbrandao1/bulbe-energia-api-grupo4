// src/middleware/auth.js
export const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token JWT ausente ou inválido.' });
  }
  // Popula req.usuario com dados mock até integração real de JWT
  req.usuario = { id: 1 };
  next();
};
