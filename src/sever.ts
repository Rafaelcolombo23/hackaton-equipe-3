import express from 'express';
import cors from 'cors';

const app = express();

// Libera o CORS para todos os domínios (pode personalizar depois)
app.use(cors());

// Permite JSON no body
app.use(express.json());

// Rotas da aplicação

// Rota padrão
app.get('/', (req, res) => {
  res.send('API rodando com CORS habilitado!');
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});