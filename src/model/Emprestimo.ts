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
        const listaDeEmprestimo: Array<any> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectEmprestimos = `SELECT e.id_emprestimo, e.id_aluno, e.id_livro,
                       e.data_emprestimo, e.data_devolucao, e.status_emprestimo, e.status_emprestimo_registro,
                       a.ra, a.nome, a.sobrenome, a.celular, 
                       l.titulo, l.autor, l.editora
                FROM Emprestimo e
                JOIN Aluno a ON e.id_aluno = a.id_aluno
                JOIN Livro l ON e.id_livro = l.id_livro
                WHERE e.status_emprestimo_registro = TRUE;`;

            // Executa a query no banco de dados
            const respostaBD = await database.query(querySelectEmprestimos);

            // Verifica se há resultados
            if (respostaBD.rows.length === 0) {
                return null;
            }

            // Itera sobre as linhas retornadas
            respostaBD.rows.forEach((linha: any) => {
                // Monta o objeto de empréstimo com os dados do aluno e do livro
                const emprestimo = {
                    idEmprestimo: linha.id_emprestimo,
                    idAluno: linha.id_aluno,
                    idLivro: linha.id_livro,
                    dataEmprestimo: linha.data_emprestimo,
                    dataDevolucao: linha.data_devolucao,
                    statusEmprestimo: linha.status_emprestimo,
                    statusEmprestimoRegistro: linha.status_emprestimo_registro,
                    aluno: {
                        ra: linha.ra,
                        nome: linha.nome,
                        sobrenome: linha.sobrenome,
                        celular: linha.celular
                    },
                    livro: {
                        titulo: linha.titulo,
                        autor: linha.autor,
                        editora: linha.editora
                    }
                };

                // Adiciona o objeto à lista de empréstimos
                listaDeEmprestimo.push(emprestimo);
            });

            // retorna a lista de empréstimos
            return listaDeEmprestimo;
        } catch (error) {
            console.log('Erro ao buscar lista de empréstimos');
            return null; // retorna null em caso de erro
        }
    }

    static async cadastroEmprestimo(emprestimo: Emprestimo): Promise<boolean> {
        try {
            const queryInsertEmprestimo = `INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
                                        VALUES 
                                    ('${emprestimo.getIdAluno()}', 
                                    '${emprestimo.getIdLivro()}', 
                                    '${emprestimo.getDataEmprestimo()}', 
                                    '${emprestimo.getDataDevolucao()}', 
                                    '${emprestimo.getStatusEmprestimo()}' )
                                    RETURNING id_emprestimo;`;
            const respostaBD = await database.query(queryInsertEmprestimo);
            if (respostaBD.rowCount != 0) {
                console.log(`Empréstimo cadastrado com sucesso! ID do emprestimo: ${respostaBD.rows[0].id_emprestimo}`);
                return true;
            }
            return false;
        } catch (error) {
            console.log('Erro ao cadastrar o emprestimo. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    /**
         * Remove um emprétimo ativo do banco de dados
         * 
         * @param idEmprestimo 
         * @returns **true** caso o empréstimo tenha sido resolvido, **false** caso contrário
         */
    static async removerEmprestimo(idEmprestimo: number): Promise<boolean> {
        // variável de controle da query
        let queryResult = false;

        // tenta executar a query
        try {
            // monta a query
            const queryDeleteEmprestimo = `UPDATE emprestimo 
                                            SET status_emprestimo_registro = FALSE
                                            WHERE id_emprestimo=${idEmprestimo}`;

            // executa a query e armazena a resposta
            const respostaBD = await database.query(queryDeleteEmprestimo);

            // verifica se a quantidade de linhas retornadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                // exibe mensagem de sucesso
                console.log('Empréstimo removido com sucesso!');
                // altera o valor da variável para true
                queryResult = true;
            }

            // retorna a resposta
            return queryResult;

            // captura qualquer erro que possa acontecer
        } catch (error) {
            // exibe detalhes do erro no console
            console.log(`Erro ao remover empréstimo: ${error}`);
            // retorna a resposta
            return queryResult;
        }
    }

    static async atualizarEmprestimo(emprestimo: Emprestimo): Promise<boolean> {
        try {
            // query para fazer update no banco de dados
            const queryUpdateEmprestimo = `UPDATE emprestimo SET 
                                    id_aluno = '${emprestimo.getIdAluno()}',
                                    id_livro = '${emprestimo.getIdLivro()}',
                                    data_emprestimo = '${emprestimo.getDataEmprestimo()}',
                                    data_devolucao = '${emprestimo.getDataDevolucao()}',
                                    status_emprestimo = '${emprestimo.getStatusEmprestimo()}'
                                    WHERE id_emprestimo = ${emprestimo.getIdEmprestimo()};`;

            // executa a query no banco de dados
            const respostaBD = await database.query(queryUpdateEmprestimo);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Empréstimo atualizado com sucesso! ID do Empréstimo: ${emprestimo.getIdEmprestimo()}`);
                // true significa que a atualização foi realizada
                return true;
            }
            // false significa que a atualização NÃO foi realizada
            return false;
        } catch (error) {
            console.log('Erro ao atualizar o empréstimo. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }
}

