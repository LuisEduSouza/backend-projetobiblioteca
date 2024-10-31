import { Request, Response } from "express";
import { Emprestimo } from "../model/Emprestimo";

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
}
