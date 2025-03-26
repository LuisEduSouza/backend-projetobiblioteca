import { Request, Response } from "express";
import { Livro } from "../model/Livro";

interface LivroDTO {
    titulo: string;
    autor: string;
    editora: string;
    anoPublicacao: Date;
    isbn: string;
    quantTotal: number;
    quantDisponivel: number;
    valorAquisicao: number;
    statusLivroEmprestado: string;
}

/**
 * Controlador para gerenciar as operações de Livro na API.
 * Esta classe herda de `Livro` e implementa métodos para listar e cadastrar livros.
 */
class LivroController extends Livro {

    /**
     * Lista todos os livros.
     * @param req - Objeto de requisição HTTP.
     * @param res - Objeto de resposta HTTP.
     * @returns - Retorna a lista de livros em formato JSON com status 200 ou uma mensagem de erro com status 400.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Acessa a função para listar livros e armazena o resultado
            const listaDeLivro = await Livro.listagemLivro();

            // Retorna a lista de livros como resposta em formato JSON
            return res.status(200).json(listaDeLivro);
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de livros:', error);

            // Retorna uma mensagem de erro ao cliente
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de livros" });
        }
    }

    /**
     * Cadastra um novo livro.
     * @param req - Objeto de requisição HTTP, contendo os dados do livro em `req.body`.
     * @param res - Objeto de resposta HTTP.
     * @returns - Retorna uma resposta com status 200 em caso de sucesso, ou 400 em caso de erro.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Recupera os dados do livro do corpo da requisição
            const livroRecebido: LivroDTO = req.body;

            // Instancia um novo objeto do tipo Livro com os dados recebidos
            const novoLivro = new Livro(
                livroRecebido.titulo,
                livroRecebido.autor,
                livroRecebido.editora,
                livroRecebido.anoPublicacao,
                livroRecebido.isbn,
                livroRecebido.quantTotal,
                livroRecebido.quantDisponivel,
                livroRecebido.valorAquisicao,
                livroRecebido.statusLivroEmprestado
            );

            // Chama a função de cadastro passando o novo livro como parâmetro
            const respostaClasse = await Livro.cadastroLivro(novoLivro);

            // Verifica se o cadastro foi realizado com sucesso
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao cadastrar livro:', error);

            // Retorna uma mensagem de erro ao cliente
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o livro. Entre em contato com o administrador do sistema." });
        }
    }

    /**
    * Remove um aluno.
    * @param req Objeto de requisição HTTP com o ID do aluno a ser removido.
    * @param res Objeto de resposta HTTP.
    * @returns Mensagem de sucesso ou erro em formato JSON.
    */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idLivro = parseInt(req.params.idLivro);
            const result = await Livro.removerLivro(idLivro);

            if (result) {
                return res.status(200).json({ mensagem: "Livro removido com sucesso!" });
            } else {
                return res.status(401).json({ mensagem: "Erro ao deletar livro" });
            }
        } catch (error) {
            console.log("Erro ao remover o Livro");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id que será atualizado
            const idLivroRecebido = parseInt(req.params.idLivro as string);

            // recuperando as informações que serão atualizadas
            const livroRecebido: LivroDTO = req.body;

            // instanciando um objeto com as informações recebidas
            const livroAtualizado = new Livro(livroRecebido.titulo,
                livroRecebido.autor,
                livroRecebido.editora,
                livroRecebido.anoPublicacao,
                livroRecebido.isbn,
                livroRecebido.quantTotal,
                livroRecebido.quantDisponivel,
                livroRecebido.valorAquisicao,
                livroRecebido.statusLivroEmprestado
            );

            // setando o id que será atualizado
            livroAtualizado.setIdLivro(idLivroRecebido);

            // chamando a função de atualização
            const resposta = await Livro.atualizarLivro(livroAtualizado);

            // verificando a resposta da função
            if (resposta) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro atualizado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o livro. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um livro. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o livro. Entre em contato com o administrador do sistema." });
        }
    }
}

export default LivroController;

