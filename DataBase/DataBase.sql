CREATE TABLE IF NOT EXISTS empresas (
    id SERIAL PRIMARY KEY,
    cnpj VARCHAR(100),
    nome VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS cadastro_tecnico (
    id SERIAL PRIMARY KEY,
    relatorio BYTEA,
    empresa_id INTEGER REFERENCES empresas(id)
);
