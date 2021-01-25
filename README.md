## Auth Service

API Para Realizar Sign In e Sign Up de usuários com Node.js e MongoDB

### Executando a aplicação

Para rodar a aplicação, siga os passos abaixo:

**Antes de seguir os passos abaixo, acesse a raíz do projeto, duplique o arquivo .env.example e renomeie para .env e altere os valores das variáveis com os valores desejados. Para executar a aplicação com o Docker, altere a variável de ambientev USING_DOCKER para true. Para executar sem o Docker, altere o valor para false. Recomenda-se manter a porta do mongodb.**

**Utilizando o Docker**

**OBS: caso utilize Windows, é recomendável instalar e configurar o WSL2 e o Docker Desktop**

**Link para configuração do WSL2:** **https://docs.microsoft.com/pt-br/windows/wsl/install-win10**

**Link para instalação do Docker Desktop:** **https://www.docker.com/products/docker-desktop**

**1-** Execute o comando **npm install** na raiz do projeto, para instalar as dependências necessárias para executar o eslint

**2-** Baixe o Docker através do link, conforme seu sistema operacional: **https://docs.docker.com/get-docker/**

**3-** Baixe o Docker Compose através do link, conforme seu sistema operacional: **https://docs.docker.com/compose/install/**

**4-** Após instalar o Docker e o Docker Compose, acesse a raiz do projeto e execute o script: **docker-run-containers.sh ou execute o comando docker-compose up**

**Rodando a aplicação manualmente em ambiente local**

**1-** Acesse a raiz do projeto e execute: **npm install**

**2-** Após instalar as dependências, execute **npm run dev**

**3-** O MongoDB local deverá estar em execução para realizar a conexão

**Executando testes**

Para executar testes, caso esteja rodando a aplicação **com Docker, acesse a raiz do projeto e execute o script docker-test.sh**.  Para executar os testes manualmente, acesse a raiz do projeto e execute o comando **npm test**.

### Rotas:

**Rota: /signup | -X POST | -H Content-Type: application/json**

**Body:**
```
{
  "nome" : "Teste",
  "email" : "mail@mail.com",
  "senha" : "123abc",
  "telefones" : [
     {
       "telefone" : "88888888",
       "ddd" : "32"
     },
     {
       "telefone" : "99999999",
       "ddd" : "32"
     }
	 ]
}
```

**Rota: /signin | -X POST | -H Content-Type: application/json**

**Body:**
```
{
  "email": "mail@mail.com"
  "senha": "123abc"
}
```

**Rota: /users/:id | -X GET | -H authorization: Bearer {token}**

**Body:**
```
{
  "email": "mail@mail.com"
  "senha": "123abc"
}
```

