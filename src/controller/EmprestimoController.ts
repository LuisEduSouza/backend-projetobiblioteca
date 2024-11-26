import { Request, Response } from "express";
import { Emprestimo } from "../model/Emprestimo";
import { Livro } from "../model/Livro";

/**
 * Controlador para gerenciar as operações de empréstimos na API.
 * Esta classe herda de `Emprestimo` e implementa métodos para listar empréstimos.
 */
export class EmprestimoController extends Emprestimo {

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

    static async remover(req: Request, res: Response): Promise<any> {
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
}
