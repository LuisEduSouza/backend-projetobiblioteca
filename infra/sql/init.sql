CREATE DATABASE Biblioteca

-- CREATE ALUNO - TRIGGER - FUNCTION
CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');


-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Lionel', 'Messi', '2000-06-24', 'Rua Futebol, 10', 'messi@futebol.com', '11988776655'),
('Serena', 'Williams', '1999-09-26', 'Rua Tênis, 123', 'serena@tennis.com', '11987654321'),
('Michael', 'Phelps', '1998-06-30', 'Rua Natação, 456', 'phelps@swim.com', '11985642309'),
('LeBron', 'James', '2000-12-30', 'Rua NBA, 321', 'lebron@nba.com', '11987876677'),
('Usain', 'Bolt', '2001-08-21', 'Rua Corrida, 789', 'bolt@corrida.com', '11988997766'),
('Stephen', 'Curry', ' 2002-03-14', 'Rua NBA, 100', 'curry@nba.com', '11985854545'),
('Novak', 'Djokovic', '2003-05-22', 'Rua Tênis, 999', 'djokovic@tennis.com', '11989876543'),
('Simone', 'Biles', '2001-03-14', 'Rua Ginástica, 555', 'biles@gymnastics.com', '11983456789'),
('Neymar', 'Junior', '2002-02-05', 'Rua Futebol, 200', 'neymar@futebol.com', '11987654322'),
('Rafael', 'Nadal', '2001-06-03', 'Rua Tênis, 12', 'nadal@tennis.com', '11985673456');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('Crime e Castigo', 'Fiódor Dostoiévski', 'Penguin Classics', '1866', '978-0140449136', 5, 5, 120.00, 'Disponível'),
('Cem Anos de Solidão', 'Gabriel García Márquez', 'Record', '1967', '978-0307389732', 6, 6, 100.00, 'Disponível'),
('O Nome da Rosa', 'Umberto Eco', 'Record', '1980', '978-8532511014', 7, 7, 90.00, 'Disponível'),
('A Divina Comédia', 'Dante Alighieri', 'Ediouro', '1320', '978-8572328474', 4, 4, 130.00, 'Disponível'),
('Os Miseráveis', 'Victor Hugo', 'Cosac Naify', '1862', '978-8575034852', 3, 3, 110.00, 'Disponível'),
('Ulisses', 'James Joyce', 'Penguin Classics', '1922', '978-0141182801', 2, 2, 140.00, 'Disponível'),
('Madame Bovary', 'Gustave Flaubert', 'Penguin Classics', '1857', '978-0140449129', 6, 6, 95.00, 'Disponível'),
('A Montanha Mágica', 'Thomas Mann', 'Nova Fronteira', '1924', '978-8503002271', 3, 3, 125.00, 'Disponível'),
('Bíblia Sagrada', 'Sociedade Bíblica do Brasil', 'Sociedade Bíblica do Brasil', '2018', '978-8531114421', 20, 20, 50.00, 'Disponível'),
('Don Juan', 'Molière', 'Penguin Classics', '1665', '978-0140449044', 5, 5, 105.00, 'Disponível');

INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
VALUES 
(21,20, '2024-10-01', '2024-10-15', 'Em andamento'),
(30,12, '2024-10-02', '2024-10-16', 'Em andamento'),
(24,13, '2024-10-03', '2024-10-17', 'Em andamento'),
(29, 16, '2024-10-04', '2024-10-18', 'Em andamento'),
(25, 17, '2024-10-05', '2024-10-19', 'Em andamento'),
(26, 18, '2024-10-06', '2024-10-20', 'Em andamento'),
(27, 14, '2024-10-07', '2024-10-21', 'Em andamento'),
(28, 19, '2024-10-08', '2024-10-22', 'Em andamento'),
(23, 15, '2024-10-09', '2024-10-23', 'Em andamento'),
(22, 11, '2024-10-10', '2024-10-24', 'Em andamento');

SELECT * FROM ALUNO;
SELECT * FROM LIVRO;

SELECT 
    a.ra, 
    a.nome, 
    a.sobrenome, 
    a.celular, 
    l.titulo, 
    l.autor, 
    l.editora, 
    e.data_emprestimo, 
    e.data_devolucao, 
    e.status_emprestimo
FROM 
    Emprestimo e
JOIN 
    Aluno a ON e.id_aluno = a.id_aluno
JOIN 
    Livro l ON e.id_livro = l.id_livro;


