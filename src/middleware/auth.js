import jwt from 'jsonwebtoken';

export const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token JWT ausente ou inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, 'bulbe-segredo-jwt');
    req.usuario = payload; // injeta { id, email } no req
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token JWT ausente ou inválido.' });
  }
};