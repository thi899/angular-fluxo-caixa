# Meu App Angular

Este é um aplicativo desenvolvido com Angular 14. Este README fornece informações sobre como configurar e executar o projeto localmente.

## Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente incluído com o Node.js)

## Instalando dependencias

Em sua pasta raiz, execute o seguinte comando:

npm install

## Iniciando app na porta 4200(Default)

execute o seguinte comando:

npm run start


## Iniciando o JSON Server na Porta 8080

Para iniciar o `json-server` e servir os dados contidos em `server/database.json` na porta 8080, execute o seguinte comando:

json-server --watch server/database.json --port 8080
