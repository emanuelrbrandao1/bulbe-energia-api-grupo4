// src/config/auth.js
// Configuracao centralizada de autenticacao JWT.
// Usado pelo authController (assinatura) e pelo middleware autenticarJWT (verificacao).

export const JWT_SECRET = 'bulbe-segredo-jwt';
export const JWT_EXPIRES_IN = '24h';
