import { DatabaseModel } from "./DatabaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;

/**
 * Classe que representa um aluno.
 */
export class Aluno {

    /* Atributos */
    /* Identificador do aluno */
    private idAluno: number = 0;
    /* Registro acadêmico do aluno */
    private ra: string = '';
    /* Nome do aluno */
    private nome: string;
    /* Sobrenome do aluno */
    private sobrenome: string;
    /* Data de nascimento do aluno */
    private dataNascimento: Date;
    /* Endereço residencial do aluno */
    private endereco: string;
    /* E-mail do aluno */
    private email: string;
    /* Número de celular do aluno */
    private celular: string;

    /**
     * Construtor da classe Aluno
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereço residencial do aluno
     * @param email E-mail do aluno
     * @param celular Número de celular do aluno
     */
    constructor(
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string
    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do aluno.
     * @returns o identificador do aluno.
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Define o identificador do aluno.
     * @param idAluno O novo identificador do aluno.
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Recupera o registro acadêmico do aluno.
     * @returns o registro acadêmico (RA) do aluno.
     */
    public getRa(): string {
        return this.ra;
    }

    /**
     * Define o registro acadêmico do aluno.
     * @param ra O novo registro acadêmico do aluno.
     */
    public setRa(ra: string): void {
        this.ra = ra;
    }

    /**
     * Recupera o nome do aluno.
     * @returns o nome do aluno.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do aluno.
     * @param nome O novo nome do aluno.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Recupera o sobrenome do aluno.
     * @returns o sobrenome do aluno.
     */
    public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * Define o sobrenome do aluno.
     * @param sobrenome O novo sobrenome do aluno.
     */
    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    /**
     * Recupera a data de nascimento do aluno.
     * @returns a data de nascimento do aluno.
     */
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    /**
     * Define a data de nascimento do aluno.
     * @param dataNascimento A nova data de nascimento do aluno.
     */
    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    /**
     * Recupera o endereço residencial do aluno.
     * @returns o endereço do aluno.
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * Define o endereço residencial do aluno.
     * @param endereco O novo endereço do aluno.
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
     * Recupera o e-mail do aluno.
     * @returns o e-mail do aluno.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define o e-mail do aluno.
     * @param email O novo e-mail do aluno.
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Recupera o número de celular do aluno.
     * @returns o número de celular do aluno.
     */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * Define o número de celular do aluno.
     * @param celular O novo número de celular do aluno.
     */
    public setCelular(celular: string): void {
        this.celular = celular;
    }

    /**
     * Busca e retorna uma lista de alunos do banco de dados.
     * @returns Um array de objetos do tipo `Aluno` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "aluno".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Aluno`.
     * - Cada aluno é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemAlunos(): Promise<Array<Aluno> | null> {
        const listaDeAlunos: Array<Aluno> = [];
        try {
            const querySelectAlunos = `SELECT * FROM aluno;`;
            const respostaBD = await database.query(querySelectAlunos);
            respostaBD.rows.forEach((linha) => {
                const novoAluno = new Aluno(
                    linha.nome,
                    linha.sobrenome,
                    linha.data_nascimento,
                    linha.endereco,
                    linha.email,
                    linha.celular
                );
                novoAluno.setIdAluno(linha.id_aluno);
                novoAluno.setRa(linha.ra);
                listaDeAlunos.push(novoAluno);
            });
            return listaDeAlunos;
        } catch (error) {
            console.log('Erro ao buscar lista de alunos');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um aluno no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Aluno` e insere seus dados (nome, sobrenome, data de nascimento,
     * endereço, email e celular) na tabela `Aluno` do banco de dados. O método retorna um valor booleano
     * indicando se o cadastro foi realizado com sucesso.
     * 
     * @param {Aluno} aluno - Objeto contendo os dados do aluno que será cadastrado. O objeto `Aluno`
     *                        deve conter os métodos `getNome()`, `getSobrenome()`, `getDataNascimento()`,
     *                        `getEndereco()`, `getEmail()` e `getCelular()` que retornam os respectivos
     *                        valores do aluno.
     * @returns {Promise<boolean>} - Retorna `true` se o aluno foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroAluno(aluno: Aluno): Promise<boolean> {
        try {
            const queryInsertAluno = `INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
                                        VALUES 
                                    ('${aluno.getNome()}', 
                                    '${aluno.getSobrenome()}', 
                                    '${aluno.getDataNascimento()}', 
                                    '${aluno.getEndereco()}', 
                                    '${aluno.getEmail()}', 
                                    '${aluno.getCelular()}')
                                    RETURNING id_aluno;`;
            const respostaBD = await database.query(queryInsertAluno);
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do aluno: ${respostaBD.rows[0].id_aluno}`);
                return true;
            }
            return false;
        } catch (error) {
            console.log('Erro ao cadastrar o aluno. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    static async removerAluno(idAluno: number): Promise<boolean> {
        try {
            // query para fazer delete de um aluno no banco de dados
            const queryDeleteAluno = `DELETE FROM aluno WHERE id_aluno = ${idAluno};`;

            // executa a query no banco e armazena a resposta do banco de dados
            const respostaBD = await database.query(queryDeleteAluno);

            // verifica se a quantidade de linhas alteradas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno removido com sucesso! ID do aluno: ${idAluno}`);
                // true significa que a remoção foi bem-sucedida
                return true;
            }
            // false significa que a remoção NÃO foi bem-sucedida.
            return false;
        } catch (error) {
            console.log('Erro ao remover o aluno. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    static async atualizarAluno(aluno: Aluno): Promise<boolean> {
        try {
            // query para fazer update no banco de dados
            const queryUpdateAluno = `UPDATE aluno SET 
                                    nome = '${aluno.getNome()}',
                                    sobrenome = '${aluno.getSobrenome()}',
                                    data_nascimento = '${aluno.getDataNascimento()}',
                                    endereco = '${aluno.getEndereco()}',
                                    email = '${aluno.getEmail()}',
                                    celular = '${aluno.getCelular()}'
                                    WHERE id_aluno = ${aluno.getIdAluno()};`;

            // executa a query no banco de dados
            const respostaBD = await database.query(queryUpdateAluno);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno atualizado com sucesso! ID do aluno: ${aluno.getIdAluno()}`);
                // true significa que a atualização foi realizada
                return true;
            }
            // false significa que a atualização NÃO foi realizada
            return false;
        } catch (error) {
            console.log('Erro ao atualizar o aluno. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }
}
