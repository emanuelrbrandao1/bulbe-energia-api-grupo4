// src/db/conexao.js
//
// Camada unica de acesso ao banco (Aula 11 - SQLite).
// Abre (ou cria) o arquivo bulbe.db na raiz do projeto e garante que todas as
// tabelas existam antes de qualquer operacao de negocio. Todos os controllers
// importam esta mesma conexao: `import db from '../db/conexao.js'`.

import Database from 'better-sqlite3';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// bulbe.db fica na raiz do projeto (dois niveis acima de src/db/).
const DB_PATH = join(__dirname, '..', '..', 'bulbe.db');

// Database() abre o arquivo. Se nao existir, cria automaticamente.
const db = new Database(DB_PATH);

// ── Pragmas de desempenho e integridade ───────────────────────────────────────
// WAL (Write-Ahead Logging): permite leituras concorrentes durante escritas.
db.pragma('journal_mode = WAL');
// foreign_keys: SQLite ignora chaves estrangeiras por padrao; aqui as ativamos
// para que usuario_id / produto_id / pedido_id invalidos sejam rejeitados.
db.pragma('foreign_keys = ON');

// ── Criacao das tabelas (idempotente via IF NOT EXISTS) ───────────────────────
// Ordem importa: tabelas referenciadas (usuarios, produtos, pedidos) vem antes
// das que as referenciam, para que as FKs apontem para tabelas ja declaradas.
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT    NOT NULL,
    email TEXT    NOT NULL UNIQUE,
    senha TEXT    NOT NULL,
    papel TEXT    NOT NULL DEFAULT 'cliente'
          CHECK (papel IN ('admin', 'cliente'))
  );

  CREATE TABLE IF NOT EXISTS produtos (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    nome             TEXT    NOT NULL,
    categoria        TEXT    NOT NULL
                     CHECK (categoria IN ('lampadas', 'luminarias', 'fitas', 'acessorios', 'assistentes')),
    descricao        TEXT,
    preco            REAL    NOT NULL,
    desconto         INTEGER NOT NULL DEFAULT 0,
    imagem           TEXT,
    imagem_detalhes  TEXT,
    avaliacao        REAL    NOT NULL DEFAULT 0,
    total_avaliacoes INTEGER NOT NULL DEFAULT 0,
    destaque         INTEGER NOT NULL DEFAULT 0 CHECK (destaque IN (0, 1)),
    mais_vendido     INTEGER NOT NULL DEFAULT 0 CHECK (mais_vendido IN (0, 1))
  );

  CREATE TABLE IF NOT EXISTS carrinho (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1 CHECK (quantidade > 0),
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS favoritos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos (id) ON DELETE CASCADE,
    UNIQUE (usuario_id, produto_id)
  );

  CREATE TABLE IF NOT EXISTS pedidos (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id       INTEGER NOT NULL,
    valor_total      REAL    NOT NULL,
    status           TEXT    NOT NULL DEFAULT 'confirmado'
                     CHECK (status IN ('confirmado', 'em_preparo', 'enviado', 'entregue', 'cancelado')),
    forma_entrega    TEXT,
    metodo_pagamento TEXT,
    data_criacao     TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS pedido_itens (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id      INTEGER NOT NULL,
    produto_id     INTEGER NOT NULL,
    nome           TEXT,
    quantidade     INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario REAL    NOT NULL,
    FOREIGN KEY (pedido_id)  REFERENCES pedidos (id)  ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS enderecos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id  INTEGER NOT NULL,
    logradouro  TEXT,
    numero      TEXT,
    complemento TEXT,
    bairro      TEXT,
    localidade  TEXT,
    uf          TEXT,
    cep         TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS pagamentos (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER NOT NULL,
    metodo    TEXT    NOT NULL
              CHECK (metodo IN ('pix', 'credito', 'debito', 'cartao_credito', 'cartao_debito')),
    status    TEXT    NOT NULL DEFAULT 'pendente'
              CHECK (status IN ('pendente', 'aprovado', 'recusado', 'estornado')),
    dados     TEXT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos (id) ON DELETE CASCADE
  );
`);

export default db;
