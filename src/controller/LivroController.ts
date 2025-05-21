import { Livro } from "../model/Livro";
import { Request, Response } from "express";
import path from 'path';

/**
 * Interface LivroDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface LivroDTO {
    titulo: string;
    autor: string;
    editora: string;
    anoPublicacao?: number;
    isbn?: string;
    quantTotal: number;
    quantDisponivel: number;
    valorAquisicao?: number;
    statusLivroEmprestado?: string;
}

/**
 * Controlador para operações relacionadas aos Livros.
 */
class LivroController extends Livro {
    /**
     * Lista todos os livros.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDeLivros = await Livro.listarLivros();
            res.status(200).json(listaDeLivros);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações do Livro");
        }
    }

    /**
     * Cadastra um novo livro.
     */
    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: LivroDTO = req.body;

            const novoLivro = new Livro(
                dadosRecebidos.titulo,
                dadosRecebidos.autor,
                dadosRecebidos.editora,
                (dadosRecebidos.anoPublicacao ?? 0).toString(),
                dadosRecebidos.isbn ?? '',
                dadosRecebidos.quantTotal,
                dadosRecebidos.quantDisponivel,
                dadosRecebidos.valorAquisicao ?? 0,
                dadosRecebidos.statusLivroEmprestado ?? 'Disponível'
            );

            const result = await Livro.cadastrarLivro(novoLivro);

            if (result.queryResult && result.idLivro) {
                novoLivro.setIdLivro(result.idLivro);

                if (req.file) {
                    const nomeImagem = req.file.filename;
                    await Livro.atualizarImagemCapa(nomeImagem, novoLivro.getIdLivro());
                }

                return res.status(200).json({ mensagem: 'Livro cadastrado com sucesso' });
            } else {
                return res.status(400).json({ mensagem: 'Não foi possível cadastrar o livro no banco de dados' });
            }
        } catch (error) {
            console.error(`Erro ao cadastrar o livro: ${error}`);
            return res.status(500).json({ mensagem: 'Erro ao cadastrar o livro' });
        }
    }

    /**
     * Remove um livro.
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idLivro = parseInt(req.query.idLivro as string);
            const result = await Livro.removerLivro(idLivro);

            if (result) {
                return res.status(200).json('Livro removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar livro');
            }
        } catch (error) {
            console.log("Erro ao remover o Livro");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Atualiza os dados de um livro.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: LivroDTO = req.body;

            const livro = new Livro(
                dadosRecebidos.titulo,
                dadosRecebidos.autor,
                dadosRecebidos.editora,
                (dadosRecebidos.anoPublicacao ?? 0).toString(),
                dadosRecebidos.isbn ?? '',
                dadosRecebidos.quantTotal,
                dadosRecebidos.quantDisponivel,
                dadosRecebidos.valorAquisicao ?? 0,
                dadosRecebidos.statusLivroEmprestado ?? 'Disponível'
            );

            livro.setIdLivro(parseInt(req.query.idLivro as string));

            if (await Livro.atualizarCadastroLivro(livro)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o livro no banco de dados');
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar livro." });
        }
    }
}

export default LivroController;
