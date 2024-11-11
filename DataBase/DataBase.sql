CREATE TABLE IF NOT EXISTS empresas (
    id SERIAL PRIMARY KEY,
    cnpj VARCHAR(100),
    nome VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS cadastro_tecnico (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
    empresas_id INT NOT NULL,
    FOREIGN KEY (empresas_id) REFERENCES empresas(id)
);

CREATE TABLE IF NOT EXISTS setor (
    id SERIAL PRIMARY KEY,
    nome_setor VARCHAR(100),
    funcao VARCHAR(100),
    risco VARCHAR(100),
    cadastro_tecnico_id INT NOT NULL,
    empresas_id INT NOT NULL,
    FOREIGN KEY (cadastro_tecnico_id) REFERENCES cadastro_tecnico(id),
    FOREIGN KEY (empresas_id) REFERENCES empresas(id)
);