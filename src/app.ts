import { server } from "./server";
import { DatabaseModel } from "./model/DatabaseModel";
import dotenv from 'dotenv';

dotenv.config();

//Define a porta que o servidor vai escutar as requisições
const port: number = 3333;

new DatabaseModel().testeConexao().then((resdb) => {
    if (resdb) {
        console.clear();
        console.log("Conexão com banco de dados realizada com sucesso!");
        // iniciando o servidor
        server.listen(port, () => {
            console.log(`Servidor iniciado no endereço :${port}`);
        });
    } else {
        console.log("Erro ao conectar com o banco de dados");
    }
});