import { DatabaseModel } from "./DatabaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;


/**
 * Classe que representa um empréstimo de livro.
 */
export class Emprestimo {

    /* Atributos */
    /* Identificador do empréstimo */
    private idEmprestimo: number = 0;
    /* Identificador do aluno que realiza o empréstimo */
    private idAluno: number;
    /* Identificador do livro que está sendo emprestado */
    private idLivro: number;
    /* Data do empréstimo */
    private dataEmprestimo: Date;
    /* Data prevista para devolução do livro */
    private dataDevolucao: Date;
    /* Status atual do empréstimo (ex: "ativo", "finalizado") */
    private statusEmprestimo: string;

    /**
     * Construtor da classe Emprestimo
     * 
     * @param idAluno Identificador do aluno que realiza o empréstimo
     * @param idLivro Identificador do livro a ser emprestado
     * @param dataEmprestimo Data em que o empréstimo foi realizado
     * @param dataDevolucao Data prevista para devolução do livro
     * @param statusEmprestimo Status atual do empréstimo
     */
    constructor(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string
    ) {
        this.idAluno = idAluno;
        this.idLivro = idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do empréstimo.
     * @returns o identificador do empréstimo.
     */
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    /**
     * Define o identificador do empréstimo.
     * @param idEmprestimo O novo identificador do empréstimo.
     */
    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    /**
     * Recupera o identificador do aluno que realizou o empréstimo.
     * @returns o identificador do aluno.
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Define o identificador do aluno que realizou o empréstimo.
     * @param idAluno O novo identificador do aluno.
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Recupera o identificador do livro que foi emprestado.
     * @returns o identificador do livro.
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define o identificador do livro emprestado.
     * @param idLivro O novo identificador do livro.
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Recupera a data em que o empréstimo foi realizado.
     * @returns a data do empréstimo.
     */
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    /**
     * Define a data em que o empréstimo foi realizado.
     * @param dataEmprestimo A nova data do empréstimo.
     */
    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Recupera a data prevista para devolução do livro.
     * @returns a data de devolução.
     */
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    /**
     * Define a data prevista para devolução do livro.
     * @param dataDevolucao A nova data de devolução.
     */
    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    /**
     * Recupera o status atual do empréstimo.
     * @returns o status do empréstimo.
     */
    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    /**
     * Define o status atual do empréstimo.
     * @param statusEmprestimo O novo status do empréstimo.
     */
    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;
    }

    /**
     * Busca e retorna uma lista de empréstimos do banco de dados.
     * @returns Um array de objetos do tipo `Emprestimo` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "emprestimo".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Emprestimo`.
     * - Cada empréstimo é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemEmprestimos(): Promise<Array<Emprestimo> | null> {
        // objeto para armazenar a lista de empréstimos
        const listaDeEmprestimo: Array<Emprestimo> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectEmprestimos = `SELECT * FROM emprestimo;`;

            // fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectEmprestimos);

            // usando a resposta para instanciar objetos do tipo Emprestimo
            respostaBD.rows.forEach((linha) => {
                // instancia (cria) objeto Emprestimo
                const novoEmprestimo = new Emprestimo(
                    linha.id_livro,
                    linha.id_aluno,
                    linha.data_emprestimo,
                    linha.data_devolucao,
                    linha.status_emprestimo
                );

                // atribui o ID do empréstimo baseado na resposta do banco de dados
                novoEmprestimo.setIdEmprestimo(linha.id_emprestimo);

                // adiciona o objeto na lista
                listaDeEmprestimo.push(novoEmprestimo);
            });

            // retorna a lista de empréstimos
            return listaDeEmprestimo;
        } catch (error) {
            console.log('Erro ao buscar lista de empréstimos');
            return null; // retorna null em caso de erro
        }
    }
}

