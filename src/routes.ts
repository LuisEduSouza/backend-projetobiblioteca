//import { Express } from "express";
import { Request, Response, Router } from "express";
import { AlunoController } from "./controller/AlunoController";
import { LivroController } from "./controller/LivroController";
import { EmprestimoController } from "./controller/EmprestimoController";

// Cria um roteador
const router = Router();

// Criando sua rota principal para a aplicação
router.get("/", (req:Request, res:Response) => {
    res.json({ mensagem: "Bem-vindo ao meu servidor"});
});

// Rota para listar os alunos
router.get("/lista/alunos", AlunoController.todos);
//Rota para cadastro de alunos
router.post("/novo/aluno", AlunoController.novo);

// Rota para listar os livros
router.get("/lista/livros", LivroController.todos);
//Rota para cadastro de livro
router.post("/novo/livro", LivroController.novo);


// Rota para listar os livros
router.get("/lista/emprestimos", EmprestimoController.todos);

// Exportando as rotas
export{ router };