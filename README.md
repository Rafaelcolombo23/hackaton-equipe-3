# hackaton-equipe-3

🎯 API de Gestão de Eventos

API desenvolvida para gerenciamento de alunos, eventos, inscrições, palestrantes, coordenadores e geração de certificados em PDF.

🚀 Tecnologias Utilizadas

	•	Node.js

	•	Express

	•	TypeScript

	•	MySQL

	•	Knex.js

	•	JWT (Autenticação)

	•	PDFKit (Geração de certificados)

	•	Multer (Upload de imagens)

	•	dotenv (Variáveis de ambiente)

📂 Estrutura de Pastas

certificados/

dist/

node_modules/

src/

├── controllers/

├── middlewares/

├── migrations/

├── routes/

├── certificados/ (certificados PDF)

├── database/

├── utils/

├── server.ts

uploads/

├── palestrantes/

.env

knexfile.ts

package-lock.json

package.json

README.md

tsconfig.json

🔧 Instalação

1.	Clone o projeto:

git clone https://github.com/hackaton-equipe-3
.git

2.	Instale as dependências:

npm install

3.	Configure o arquivo knexfile.ts:

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      port: 8889,
      user: "root",
      password: "root",
      database: "hackaton",
    },
    migrations: {
     directory: "./src/migrations", 
      extension: "ts",
    },
  },
};

4.	Rode as migrations:

npm run migrate

5.	Inicie o servidor:

npm run dev

🔐 Autenticação

Autenticação baseada em JWT. Após o login, um token é retornado e deve ser enviado nas requisições autenticadas no header:

Authorization: Bearer SEU_TOKEN

🛠️ Endpoints Principais

🧑 Alunos

	•	POST /alunos - Cadastrar aluno

	•	POST /login - Login

	•	PUT /alunos - Editar dados do aluno (autenticado)

🎫 Inscrições
	•	POST /inscricoes - Fazer inscrição

	•	GET /inscricoes - Listar minhas inscrições

	•	GET /inscricoes/:id - Buscar inscrição específica

	•	DELETE /inscricoes/:id - Remover inscrição

	•	GET /inscricoes/:eventoId/certificado - Gerar certificado PDF

📅 Eventos

	•	GET /eventos - Listar eventos

	•	GET /eventos/:id - Detalhar evento

🎙️ Palestrantes

	•	GET /palestrantes - Listar palestrantes e seus eventos

	•	GET /palestrantes/:id - Detalhar palestrante

	•	Upload de foto acessível em /uploads/nome-da-imagem.jpg

🧑‍💼 Coordenadores

	•	GET /coordenadores - Listar coordenadores e eventos

	•	GET /coordenadores/:id - Detalhar coordenador

📄 Geração de Certificado

Ao gerar o certificado, ele será salvo na pasta /certificados e disponibilizado como link no frontend.

📦 Upload de Imagens

As imagens dos palestrantes são armazenadas na pasta /uploads e acessíveis pela URL:

🧠 Observações

	•	Backoffice dos cadastros de palestrantes e coordenadores é feito via sistema externo (Java).

	•	Esta API serve para consumo do frontend em PHP.