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
//Rota para remover de alunos
router.delete("/delete/aluno/:idAluno", AlunoController.remover);
//Rota para atualização de alunos
router.put("/atualizar/aluno/:idAluno", AlunoController.atualizar);


// Rota para listar os livros
router.get("/lista/livros", LivroController.todos);
//Rota para cadastro de livro
router.post("/novo/livro", LivroController.novo);
//Rota para remover de livro
router.delete("/delete/livro/:idLivro", LivroController.remover);
//Rota para atualização de livros
router.put("/atualizar/livro/:idLivro", LivroController.atualizar);


// Rota para listar os empréstimos
router.get("/lista/emprestimos", EmprestimoController.todos);
//Rota para cadastro de empréstimos
router.post("/novo/emprestimo", EmprestimoController.novo);
//Rota para remover de empréstimo
router.delete("/delete/emprestimo/:idEmprestimo", EmprestimoController.remover);
//Rota para atualização de livros
router.put("/atualizar/emprestimo/:idEmprestimo", EmprestimoController.atualizar);

// Exportando as rotas
export{ router };