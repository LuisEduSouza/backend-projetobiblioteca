import { DatabaseModel } from "./DatabaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;

/**
 * Classe que representa um livro.
 */
export class Livro {

    /* Atributos */
    /* Identificador do livro */
    private idLivro: number = 0;
    /* Título do livro */
    private titulo: string;
    /* Autor do livro */
    private autor: string;
    /* Editora do livro */
    private editora: string;
    /* Ano de publicação do livro */
    private anoPublicacao: Date;
    /* Código ISBN do livro */
    private isbn: string;
    /* Quantidade total de exemplares do livro */
    private quantTotal: number;
    /* Quantidade de exemplares disponíveis */
    private quantDisponivel: number;
    /* Valor de aquisição do livro */
    private valorAquisicao: number;
    /* Status de empréstimo do livro */
    private statusLivroEmprestado: string;
    /* Controla o status do livro no sistema */
    private statusLivro: boolean = true;


    /**
     * Construtor da classe Livro
     * 
     * @param titulo Título do livro
     * @param autor Autor do livro
     * @param editora Editora do livro
     * @param anoPublicacao Ano de publicação do livro
     * @param isbn Código ISBN do livro
     * @param quantTotal Quantidade total de exemplares
     * @param quantDisponivel Quantidade de exemplares disponíveis
     * @param valorAquisicao Valor de aquisição do livro
     * @param statusLivroEmprestado Status de empréstimo do livro
     */
    constructor(
        titulo: string,
        autor: string,
        editora: string,
        anoPublicacao: Date,
        isbn: string,
        quantTotal: number,
        quantDisponivel: number,
        valorAquisicao: number,
        statusLivroEmprestado: string,
    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
        this.isbn = isbn;
        this.quantTotal = quantTotal;
        this.quantDisponivel = quantDisponivel;
        this.valorAquisicao = valorAquisicao;
        this.statusLivroEmprestado = statusLivroEmprestado;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do livro
     * @returns o identificador do livro
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define o identificador do livro
     * @param idLivro novo identificador do livro
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Retorna o título do livro.
     *
     * @returns {string} O título do livro.
     */
    public getTitulo(): string {
        return this.titulo;
    }

    /**
     * Define o título do livro.
     * 
     * @param titulo O título do livro a ser definido.
     */
    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    /**
     * Retorna o autor do livro.
     *
     * @returns {string} O autor do livro.
     */
    public getAutor(): string {
        return this.autor;
    }

    /**
     * Define o autor do livro.
     * 
     * @param autor O autor do livro a ser definido.
     */
    public setAutor(autor: string): void {
        this.autor = autor;
    }

    /**
     * Retorna a editora do livro.
     *
     * @returns {string} A editora do livro.
     */
    public getEditora(): string {
        return this.editora;
    }

    /**
     * Define a editora do livro.
     * 
     * @param editora A editora do livro a ser definida.
     */
    public setEditora(editora: string): void {
        this.editora = editora;
    }

    /**
     * Retorna o ano de publicação do livro.
     *
     * @returns {Date} O ano de publicação do livro.
     */
    public getAnoPublicacao(): Date {
        return this.anoPublicacao;
    }

    /**
     * Define o ano de publicação do livro.
     * 
     * @param anoPublicacao O ano de publicação a ser definido.
     */
    public setAnoPublicacao(anoPublicacao: Date): void {
        this.anoPublicacao = anoPublicacao;
    }

    /**
     * Retorna o código ISBN do livro.
     *
     * @returns {string} O código ISBN do livro.
     */
    public getIsbn(): string {
        return this.isbn;
    }

    /**
     * Define o código ISBN do livro.
     * 
     * @param isbn O código ISBN a ser definido.
     */
    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    /**
     * Retorna a quantidade total de exemplares do livro.
     *
     * @returns {number} A quantidade total de exemplares.
     */
    public getQuantTotal(): number {
        return this.quantTotal;
    }

    /**
     * Define a quantidade total de exemplares do livro.
     * 
     * @param quantTotal A quantidade total a ser definida.
     */
    public setQuantTotal(quantTotal: number): void {
        this.quantTotal = quantTotal;
    }

    /**
     * Retorna a quantidade de exemplares disponíveis do livro.
     *
     * @returns {number} A quantidade de exemplares disponíveis.
     */
    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }

    /**
     * Define a quantidade de exemplares disponíveis do livro.
     * 
     * @param quantDisponivel A quantidade disponível a ser definida.
     */
    public setQuantidadeDisponivel(quantDisponivel: number): void {
        this.quantDisponivel = quantDisponivel;
    }

    /**
     * Retorna o valor de aquisição do livro.
     *
     * @returns {number} O valor de aquisição do livro.
     */
    public getValorAquisicao(): number {
        return this.valorAquisicao;
    }

    /**
     * Define o valor de aquisição do livro.
     * 
     * @param valorAquisicao O valor de aquisição a ser definido.
     */
    public setValorAquisicao(valorAquisicao: number): void {
        this.valorAquisicao = valorAquisicao;
    }

    /**
     * Retorna o status de empréstimo do livro.
     *
     * @returns {string} O status de empréstimo do livro.
     */
    public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }

    /**
     * Define o status de empréstimo do livro.
     * 
     * @param statusLivroEmprestado O status de empréstimo a ser definido.
     */
    public setStatusLivroEmprestado(statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = statusLivroEmprestado;
    }

    /**
    * Retorna o status do livro
    * @returns status: status livro
    */
    public getStatusLivro() {
        return this.statusLivro;
    }

    /**
     * Atribui um valor ao atributo status do livro
     * 
     * @param _statusAluno : status do aluno
     */
    public setStatusLivro(_statusLivro: boolean) {
        this.statusLivro = _statusLivro;
    }


    /**
     * Busca e retorna uma lista de livros do banco de dados.
     * @returns Um array de objetos do tipo `Livro` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "livro".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Livro`.
     * - Cada livro é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemLivro(): Promise<Array<Livro> | null> {
        // objeto para armazenar a lista de livros
        const listaDeLivro: Array<Livro> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectLivro = `SELECT * FROM livro;`;

            // fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectLivro);

            // usando a resposta para instanciar objetos do tipo Livro
            respostaBD.rows.forEach((linha) => {
                // instancia (cria) objeto Livro
                const novoLivro = new Livro(
                    linha.titulo,
                    linha.autor,
                    linha.editora,
                    linha.ano_publicacao,
                    linha.isbn,
                    linha.quant_total,
                    linha.quant_disponivel,
                    linha.valor_aquisicao,
                    linha.status_livro_emprestado
                );

                // atribui o ID do livro baseado na resposta do banco de dados
                novoLivro.setIdLivro(linha.id_livro);
                novoLivro.setStatusLivro(linha.status_livro);

                // adiciona o objeto na lista
                listaDeLivro.push(novoLivro);
            });

            // retorna a lista de livros
            return listaDeLivro;
        } catch (error) {
            console.log('Erro ao buscar lista de livros');
            return null; // retorna null em caso de erro
        }
    }

    /**
     * Realiza o cadastro de um livro no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Livro` e insere seus dados (titulo, autor, editora, ano de publicação, isbn,
     * quantidade total, quantidade disponível, valor de aquisição e status de empréstimo) na tabela `livro` do banco de dados. 
     * O método retorna um valor booleano indicando se o cadastro foi realizado com sucesso.
     * 
     * @param {Livro} livro - Objeto contendo os dados do livro que será cadastrado. O objeto `Livro`
     *                        deve conter os métodos `getTitulo()`, `getAutor()`, `getEditora()`, `getAnoPublicacao()`, 
     *                        `getIsbn()`, `getQuantTotal()`, `getQuantDisponivel()`, `getValorAquisicao()` e 
     *                        `getStatusLivroEmprestado()` que retornam os respectivos valores do livro.
     * @returns {Promise<boolean>} - Retorna `true` se o livro foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroLivro(livro: Livro): Promise<boolean> {
        try {
            // query para fazer insert de um livro no banco de dados
            const queryInsertLivro = `INSERT INTO livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
                                    VALUES 
                                    ('${livro.getTitulo()}', 
                                    '${livro.getAutor()}', 
                                    '${livro.getEditora()}', 
                                    '${livro.getAnoPublicacao()}', 
                                    '${livro.getIsbn()}', 
                                    ${livro.getQuantTotal()}, 
                                    ${livro.getQuantDisponivel()}, 
                                    ${livro.getValorAquisicao()}, 
                                    '${livro.getStatusLivroEmprestado()}')
                                    RETURNING id_livro;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertLivro);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Livro cadastrado com sucesso! ID do livro: ${respostaBD.rows[0].id_livro}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o livro. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false; // retorna false em caso de erro
        }
    }

    /**
        * Remove um livro do banco de dados
        * @param idLivro ID do livro a ser removido
        * @returns Boolean indicando se a remoção foi bem-sucedida
       */
    static async removerLivro(id_livro: number): Promise<Boolean> {
        // variável de controle da execução da query
        let queryResult = false;

        try {
            // Cria a consulta para rmeover empréstimo do banco de dados
            const queryDeleteEmprestimoLivro = `UPDATE emprestimo SET status_emprestimo_registro = FALSE WHERE id_livro=${id_livro}`;
            // executa a query para remover empréstimo
            await database.query(queryDeleteEmprestimoLivro);

            // Construção da query SQL para deletar o Livro.
            const queryDeleteLivro = `UPDATE livro SET status_livro = FALSE WHERE id_livro=${id_livro};`;

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteLivro)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // retorna o valor da variável de controle
            return queryResult;

            // captura qualquer erro que possa acontecer
        } catch (error) {
            // Exibe detalhes do erro no console
            console.log(`Erro na consulta: ${error}`);
            // retorna o valor fa variável de controle
            return queryResult;
        }
    }

    static async atualizarLivro(livro: Livro): Promise<boolean> {
        try {
            // query para fazer update no banco de dados
            const queryUpdateLivro = `UPDATE livro SET 
                                    titulo = '${livro.getTitulo()}',
                                    autor = '${livro.getAutor()}',
                                    editora = '${livro.getEditora()}',
                                    ano_publicacao = '${livro.getAnoPublicacao()}',
                                    isbn = '${livro.getIsbn()}',
                                    quant_total = ${livro.getQuantTotal()},
                                    quant_disponivel = ${livro.getQuantDisponivel()},
                                    valor_aquisicao = ${livro.getValorAquisicao()},
                                    status_livro_emprestado = '${livro.getStatusLivroEmprestado()}'
                                    WHERE id_livro = ${livro.getIdLivro()};`;

            // executa a query no banco de dados
            const respostaBD = await database.query(queryUpdateLivro);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Livro atualizado com sucesso! ID do livro: ${livro.getIdLivro()}`);
                // true significa que a atualização foi realizada
                return true;
            }
            // false significa que a atualização NÃO foi realizada
            return false;
        } catch (error) {
            console.log('Erro ao atualizar o livro. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }
}