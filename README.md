## Auth Service

API Para Realizar Sign In e Sign Up de usuários com Node.js e MongoDB

### Executando a aplicação

Para rodar a aplicação, siga os passos abaixo:

**Utilizando o Docker**

**OBS: caso utilize Windows, é recomendável instalar e configurar o WSL2 e o Docker Desktop**

**Link para configuração do WSL2:** **https://docs.microsoft.com/pt-br/windows/wsl/install-win10**

**Link para instalação do Docker Desktop:** **https://www.docker.com/products/docker-desktop**

**1-** Baixe o docker através do link abaixo, conforme seu sistema operacional: **https://docs.docker.com/get-docker/**

**2-** Baixe o docker compose através do link abaixo: **https://docs.docker.com/compose/install/**

**3-** Após instalar o Docker e o Docker Compose, acesse a raiz do projeto e execute o script: **run-containers.sh ou execute o comando docker-compose up**

**Rodando a aplicação manualmente**

**1-** Acesse a raiz do projeto e execute: **npm run dev**

**2-** O MongoDB local deverá estar em execução para realizar a conexão

**Executando testes**

Para executar testes, caso esteja rodando a aplicação **com Docker, acesse a raiz do projeto e execute o script test.sh**.  Para executar os testes manualmente, acesse a raiz do projeto e execute o comando npm test.