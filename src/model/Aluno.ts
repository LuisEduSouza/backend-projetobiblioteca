/**
 * Classe que representa um aluno.
 */
export class Aluno {

    /* Atributos */
    /* Identificador do aluno */
    private idAluno: number = 0;
    /* Registro acadêmico do aluno */
    private ra: string;
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
     * 
     * @param ra Registro acadêmico do aluno
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereço residencial do aluno
     * @param email E-mail do aluno
     * @param celular Número de celular do aluno
     */
    constructor(
        ra: string,
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string
    ) {
        this.ra = ra;
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
}
