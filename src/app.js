// src/app.js
import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import bulbeRouter from './routes/bulbe.js';
import produtosRouter from './routes/produtos.js';
import hRouter from './routes/h.js';
import carrinhoRouter from './routes/b.js';

// Em ESM não existe __dirname — reconstruímos a partir de import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração do swagger-jsdoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'BUlBE API',
      version: '1.0.0',
      description:
        'API REST para gerenciamento do projeto da bulbe. ' +
        'Permite listar, criar, atualizar e remover items.',
      contact: {
        name: 'Bulbe API',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor de desenvolvimento local',
      },
    ],
  },
  apis: [join(__dirname, 'routes', '*.js')],
};

const swaggerDocument = swaggerJsdoc(swaggerOptions);

const app = express();
const PORT = 3000;

// Middleware: CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware: interpretar corpo JSON
app.use(express.json());

// Middleware de log simplificado
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Swagger UI — registrado ANTES das rotas de negócio
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve o JSON bruto da spec (útil para importar no Postman)
app.get('/api-docs.json', (req, res) => {
  res.json(swaggerDocument);
});

// Rotas de negócio
app.use('/api/v1/bulbe', bulbeRouter);
app.use('/api/v1/produtos', produtosRouter);
app.use('/api/v1/carrinho', hRouter);
app.use('/api/v1/carrinho', carrinhoRouter);

// Health check
app.get('/', (req, res) => {
  res.json({
    mensagem: ' Bulbe Energia API está no ar!',
    versao: '1.0.0',
    documentacao: `http://localhost:${PORT}/api-docs`,
  });
});

// Handler de erros global
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err.message);
  res.status(500).json({ erro: 'Erro interno do servidor', detalhe: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Bulbe enregia API rodando em http://localhost:${PORT}`);
  console.log(`📄 Documentação em http://localhost:${PORT}/api-docs`);
});