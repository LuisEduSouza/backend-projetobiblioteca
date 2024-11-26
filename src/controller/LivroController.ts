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
export class LivroController extends Livro {

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

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id do livro que será removido
            const idLivro = parseInt(req.params.idLivro as string);

            // chamando a função de remoção de livro
            const respostaModelo = await Livro.removerLivro(idLivro);

            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro removido com sucesso!" });
            } else {
                // retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um livro. ${error}`);

            // retorna uma mensagem de erro para quem chamou a função
            return res.status(400).json({ mensagem: "Não foi possível remover o livro. Entre em contato com o administrador do sistema." });
        }
    }
}


