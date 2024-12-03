import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

interface AlunoDTO {
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    endereco: string;
    email: string;
    celular: string;
}

/**
 * Controlador para gerenciar as operações de Aluno na API.
 * Esta classe herda de `Aluno` e implementa métodos para listar e cadastrar alunos.
 */
export class AlunoController extends Aluno {

    /**
     * Lista todos os alunos.
     * @param req - Objeto de requisição HTTP.
     * @param res - Objeto de resposta HTTP.
     * @returns - Retorna a lista de alunos em formato JSON com status 200 ou uma mensagem de erro com status 400.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Acessa a função para listar alunos e armazena o resultado
            const listaDeAlunos = await Aluno.listagemAlunos();

            // Retorna a lista de alunos como resposta em formato JSON
            return res.status(200).json(listaDeAlunos);
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de alunos:', error);
            
            // Retorna uma mensagem de erro ao cliente
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de alunos" });
        }
    }

    /**
     * Cadastra um novo aluno.
     * @param req - Objeto de requisição HTTP, contendo os dados de aluno em `req.body`.
     * @param res - Objeto de resposta HTTP.
     * @returns - Retorna uma resposta com status 200 em caso de sucesso, ou 400 em caso de erro.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Recupera os dados do aluno do corpo da requisição
            const alunoRecebido: AlunoDTO = req.body;

            // Instancia um novo objeto do tipo Aluno com os dados recebidos
            const novoAluno = new Aluno(
                alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular
            );

            // Chama a função de cadastro passando o novo aluno como parâmetro
            const respostaClasse = await Aluno.cadastroAluno(novoAluno);

            // Verifica se o cadastro foi realizado com sucesso
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o aluno. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao cadastrar aluno:', error);

            // Retorna uma mensagem de erro ao cliente
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id do aluno que será removido
            const idAluno = parseInt(req.params.idAluno as string);

            // chamando a função de remoção de aluno
            const respostaModelo = await Aluno.removerAluno(idAluno);

            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno removido com sucesso!" });
            } else {
                // retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o aluno. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um aluno. ${error}`);

            // retorna uma mensagem de erro para quem chamou a função
            return res.status(400).json({ mensagem: "Não foi possível remover o aluno. Entre em contato com o administrador do sistema." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id que será atualizado
            const idAlunoRecebido = parseInt(req.params.idAluno as string);

            // recuperando as informações que serão atualizadas
            const alunoRecebido: AlunoDTO = req.body;

            // instanciando um objeto com as informações recebidas
            const alunoAtualizado = new Aluno(alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular
                );

            // setando o id que será atualizado
            alunoAtualizado.setIdAluno(idAlunoRecebido);

            // chamando a função de atualização
            const resposta = await Aluno.atualizarAluno(alunoAtualizado);

            // verificando a resposta da função
            if (resposta) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o aluno. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um aluno. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o aluno. Entre em contato com o administrador do sistema." });
        }
    }
}

