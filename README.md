# 🌍 EcoMonitor

**Monitoramento da Qualidade do Ar em Diferentes Regiões**

## 📌 Sobre o Projeto

O **EcoMonitor** é um sistema Full Stack que permite o **registro e gerenciamento de dados sobre a qualidade do ar** em diferentes locais. O objetivo é oferecer uma interface intuitiva para visualizar e monitorar as medições de qualidade do ar.

## 🛠️ Tecnologias Utilizadas

**Backend (Node.js + Express)**  
- Node.js v20.16.0  
- Express.js  
- PostgreSQL  
- Sequelize ORM  
- TypeScript  
- CORS  
- Dotenv  

**Frontend (React.js + MUI)**  
- React.js  
- React Router  
- Material UI (MUI)  
- Axios  

---

## 🚀 Configuração do Ambiente

### 📋 **Requisitos Mínimos**
- **Node.js v20.16.0**
- **NPM**
- **PostgreSQL**
- **TypeScript**

### 📄 **Arquivos de Configuração**
Certifique-se de configurar corretamente o arquivo `.env` dentro do diretório `ecomonitor-backend/`:

```env
NODE_ENV=development
PORT=5433

# Configurações do Banco de Dados PostgreSQL
DB_HOST= seu_host
DB_PORT= porta_rodando_db # deve ser uma prota diferente da usada pela aplicao
DB_NAME= nome_db
DB_USER= postgres # ou outro usuário de sua escolha
DB_PASSWORD= sua_senha
```

Também há um arquivo `src/config/config.js` para configuração do Sequelize:

```js
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: console.log,
  }
};
```

---

## 🏗️ Passos para Rodar o Projeto

### ⚙️ **Rodando o Backend**
1. **Clone o repositório**  
   ```sh
   git clone https://github.com/EduDD125/EcoMonitor.git
   ```
2. **Acesse o diretório do backend**  
   ```sh
   cd ecomonitor/ecomonitor-backend/
   ```
3. **Instale as dependências**  
   ```sh
   npm install
   ```
4. **Execute o backend no modo de desenvolvimento**  
   ```sh
   npm run dev
   ```
   *O banco será sincronizado e populado automaticamente.*  
5. **Para rodar no modo de produção**  
   ```sh
   npm start
   ```

### 🌐 **Rodando o Frontend**
1. **Acesse o diretório do frontend**  
   ```sh
   cd ecomonitor/ecomonitor-frontend/
   ```
2. **Instale as dependências**  
   ```sh
   npm install
   ```
3. **Inicie o frontend**  
   ```sh
   npm start
   ```
   *A aplicação será iniciada em `http://localhost:3000/`.*

---

## 📡 API - Endpoints Principais

| Método | Endpoint               | Descrição                          |
|--------|------------------------|------------------------------------|
| GET    | `/api/logs`            | Lista todos os logs do sistema    |
| GET    | `/api/logs/:id`        | Retorna um log específico         |
| GET    | `/api/leituras`        | Lista todas as leituras           |
| GET    | `/api/leituras/:id`    | Retorna detalhes de uma leitura   |
| POST   | `/api/leituras`        | Cria uma nova leitura             |
| PUT    | `/api/leituras/:id`    | Atualiza uma leitura existente    |
| DELETE | `/api/leituras/:id`    | Deleta uma leitura                |

A comunicação entre **frontend** e **backend** é feita via **Axios**, enquanto o **CORS** permite conexões seguras.

---

## 🎨 Interface do Usuário (Frontend)

### 🖥️ **Principais Páginas**
| Página | URL | Descrição |
|--------|-----|-----------|
| 📊 **Listagem de Leituras** | `/leituras` | Mostra todas as medições registradas |
| 🔍 **Detalhamento de Leitura** | `/leituras/:id` | Exibe detalhes de uma medição específica |
| ➕ **Nova Leitura** | `/leituras/nova_leitura` | Permite criar uma nova medição |
| 📝 **Logs do Sistema** | `/logs` | Exibe todos os logs do sistema |

---

## 🗄️ Banco de Dados

- **Banco de dados utilizado**: PostgreSQL  
- **Sincronização automática**: Sim  
- **Seeds com dados de exemplo**: Sim  

Ao rodar `npm run dev`, os seguintes scripts são executados automaticamente:

```json
"scripts": {
  "dev": "npx tsx ./src/database/sync.ts && npx sequelize-cli db:migrate && npx tsx ./src/database/seed.ts && nodemon --watch src --exec tsx ./src/app.ts",
  "build": "npx rimraf dist && tsc",
  "prestart": "npm run build",
  "start": "node dist/js/app.js"
}
```

Isso garante que o banco de dados seja criado e populado com dados de exemplo.

---

## 🚧 Limitações e Melhorias Futuras

Atualmente, o **EcoMonitor** **não possui**:
✅ Autenticação de usuários  
✅ Exportação de dados  
✅ Coleta automática de dados reais da internet  

O projeto foi desenvolvido para **demonstração técnica** e pode ser expandido para produção no futuro.

---

## 🌍 Deploy e Produção

🔹 **O projeto ainda não está hospedado online.**  
🔹 **Docker ainda não foi implementado.**  
🔹 Para produção, será necessário configurar variáveis de ambiente manualmente.

---

## 🤝 Contribuindo para o Projeto

Caso queira contribuir:
1. **Fork o repositório**  
2. **Crie um branch com sua feature**  
3. **Faça um Pull Request**  

Seus PRs serão avaliados com base em **boas práticas** e **qualidade do código**.

---

## 🧪 Testes Automatizados

Atualmente, **não há testes automatizados**, mas futuras versões poderão incluir testes unitários e integração.

---

## 🚀 Contato

Caso tenha dúvidas ou sugestões, entre em contato:

📧 **Email**: duarte.derisso@gmail.com  
🐙 **GitHub**: [EduDD125](https://github.com/EduDD125)  
