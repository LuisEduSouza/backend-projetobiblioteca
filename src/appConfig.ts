const SERVER_ROUTES = {
    NOVO_ALUNO: '/novo/aluno',
    ATUALIZAR_ALUNO: '/atualizar/aluno/:idAluno',
    REMOVER_ALUNO: '/delete/aluno/:idAluno',
    LISTAR_ALUNOS: '/lista/alunos',

    NOVO_LIVRO: '/novo/livro',
    ATUALIZAR_LIVRO: '/atualizar/livro/:idLivro',
    REMOVER_LIVRO: '/delete/livro/:idLivro',
    LISTAR_LIVROS: '/lista/livros',

    NOVO_EMPRESTIMO: '/novo/emprestimo',
    ATUALIZAR_EMPRESTIMO: '/atualizar/emprestimo/:idEmprestimo',
    LISTAR_EMPRESTIMOS: '/lista/emprestimos',
    REMOVER_EMPRESTIMOS: '/delete/emprestimo/:idEmprestimo',

    LISTAR_USUARIO: '/listar/usuario',
    NOVO_USUARIO: '/novo/usuario',
}

export { SERVER_ROUTES }