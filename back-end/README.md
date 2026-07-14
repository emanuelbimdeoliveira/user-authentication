# 🔐 Authentication API

API REST desenvolvida em **Node.js** com **Express** e **SQLite**, criada com o objetivo de praticar autenticação de usuários utilizando **JSON Web Token (JWT)**.

O projeto implementa cadastro de usuários, login com senha criptografada e proteção de rotas através de middleware de autenticação.

---

# 🚀 Tecnologias utilizadas

* Node.js
* Express
* SQLite
* bcrypt
* JSON Web Token (JWT)
* dotenv

---

# 📚 Conceitos praticados

* Arquitetura em camadas (Routes → Controllers → Models)
* Cadastro de usuários
* Login de usuários
* Hash de senhas com bcrypt
* Geração de tokens JWT
* Middleware de autenticação
* Rotas protegidas
* Validação de dados
* Organização e modularização do projeto
* Tratamento de erros

---

# 📂 Estrutura do projeto

```text
src/
│
├── config/
│   └── jwt.js
│
├── controllers/
│   └── userController.js
│
├── database/
│   ├── database.js
│   └── createTable.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   └── userModel.js
│
├── routes/
│   └── userRoutes.js
│
├── utils/
│   └── utils.js
│
├── validators/
│   └── userValidators.js
│
└── server.js
```

---

# 🗄 Banco de dados

O projeto utiliza **SQLite** contendo uma única tabela:

## Users

* id
* name
* email
* password
* creation_date

As senhas são armazenadas utilizando **bcrypt**, garantindo que nunca sejam gravadas em texto puro no banco de dados.

---

# 🔐 Autenticação

Após realizar o login, a API gera um **JSON Web Token (JWT)** contendo as informações básicas do usuário autenticado.

Esse token deve ser enviado nas rotas protegidas através do cabeçalho:

```http
Authorization: Bearer seu_token_aqui
```

O middleware valida o token antes de permitir o acesso às rotas protegidas.

---

# 📡 Rotas da API

| Método | Rota        | Descrição                               |
| ------ | ----------- | --------------------------------------- |
| POST   | `/register` | Cadastro de usuário                     |
| POST   | `/login`    | Login do usuário                        |
| GET    | `/me`       | Retorna os dados do usuário autenticado |

---

# ⚙️ Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
JWT_SECRET=sua_chave_secreta
```

Inicie o servidor:

```bash
npm start
```

ou

```bash
node src/server.js
```

---

# 🎯 Objetivo do projeto

Este projeto foi desenvolvido com foco em aprendizado dos principais conceitos de autenticação em aplicações backend.

Durante o desenvolvimento foram praticados conceitos como:

* Cadastro e login de usuários
* Hash de senhas utilizando bcrypt
* Geração e validação de tokens JWT
* Middleware de autenticação
* Proteção de rotas
* Organização em camadas
* Validação de dados
* Modularização do código

Este projeto serviu como base para o desenvolvimento do projeto **To-Do List API com Autenticação**, que adiciona relacionamento entre tabelas e gerenciamento de tarefas por usuário autenticado.

---

# 📄 Licença

Este projeto foi desenvolvido para fins de estudo e aprendizado.
