import { Request, Response } from "express";
import { Emprestimo } from "../model/Emprestimo";

interface EmprestimoDTO {
    idAluno: number;
    idLivro: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;
    statusEmprestimo: string;
}

/**
 * Controlador para gerenciar as operações de empréstimos na API.
 * Esta classe herda de `Emprestimo` e implementa métodos para listar empréstimos.
 */
class EmprestimoController extends Emprestimo {

    /**
     * Lista todos os empréstimos.
     * @param req - Objeto de requisição HTTP.
     * @param res - Objeto de resposta HTTP.
     * @returns - Retorna a lista de empréstimos em formato JSON com status 200 ou uma mensagem de erro com status 400.
     * 
     * - A função chama o método `listagemEmprestimos` da classe `Emprestimo` para obter todos os registros de empréstimos.
     * - Se a consulta for bem-sucedida, os dados são retornados ao cliente.
     * - Em caso de erro, uma mensagem de erro é exibida no console e uma resposta com status 400 é enviada ao cliente.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Chama o método para listar todos os empréstimos
            const listaDeEmprestimos = await Emprestimo.listagemEmprestimos();
            
            // Retorna a lista de empréstimos em formato JSON com status 200
            return res.status(200).json(listaDeEmprestimos);
        } catch (error) {
            // Exibe mensagem de erro no console
            console.log('Erro ao acessar listagem de empréstimos:', error);
            
            // Retorna uma mensagem de erro com status 400
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de empréstimos" });
        }
    }

    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Recupera os dados do corpo da requisição
            const emprestimoRecebido: EmprestimoDTO = req.body;

            // Instancia um novo objeto com os dados recebidos
            const novoEmprestimo = new Emprestimo(
                emprestimoRecebido.idAluno,
                emprestimoRecebido.idLivro,
                emprestimoRecebido.dataEmprestimo,
                emprestimoRecebido.dataDevolucao,
                emprestimoRecebido.statusEmprestimo
            );

            // Chama a função de cadastro passando o novo emprestimo como parâmetro
            const respostaClasse = await Emprestimo.cadastroEmprestimo(novoEmprestimo);

            // Verifica se o cadastro foi realizado com sucesso
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Empréstimo cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o empréstimo. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao cadastrar empréstimo:', error);

            // Retorna uma mensagem de erro ao emprestimo
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o empréstimo. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando o id do empréstimo que será removido
            const idEmprestimo = parseInt(req.params.idEmprestimo as string);

            // chamando a função de remoção de empréstimo
            const respostaModelo = await Emprestimo.removerEmprestimo(idEmprestimo);

            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Empréstimo removido com sucesso!" });
            } else {
                // retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o Empréstimo. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um empréstimo. ${error}`);

            // retorna uma mensagem de erro para quem chamou a função
            return res.status(400).json({ mensagem: "Não foi possível remover o empréstimo. Entre em contato com o administrador do sistema." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id que será atualizado
            const idEmprestimoRecebido = parseInt(req.params.idEmprestimo as string);

            // recuperando as informações que serão atualizadas
            const emprestimoRecebido: EmprestimoDTO = req.body;

            // instanciando um objeto com as informações recebidas
            const emprestimoAtualizado = new Emprestimo(emprestimoRecebido.idAluno,
                emprestimoRecebido.idLivro,
                emprestimoRecebido.dataEmprestimo,
                emprestimoRecebido.dataDevolucao,
                emprestimoRecebido.statusEmprestimo
                );

            // setando o id que será atualizado
            emprestimoAtualizado.setIdEmprestimo(idEmprestimoRecebido);

            // chamando a função de atualização
            const resposta = await Emprestimo.atualizarEmprestimo(emprestimoAtualizado);

            // verificando a resposta da função
            if (resposta) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Empréstimo atualizado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o empréstimo. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um empréstimo. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o empréstimo. Entre em contato com o administrador do sistema." });
        }
    }
}

export default EmprestimoController;