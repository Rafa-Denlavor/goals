# **Meta Certa Service**  
**Descrição curta**: Servidor desenvolvido em Fastify para o gerenciamento de metas semanais.

## 🚀 **Visão Geral**
Este website faz parte de uma iniciativa para democratizar para pessoas com pouca experiência o acesso a ferramentas de edições. Atualmente o PolarizeMe apenas gera e edita fotos polaroides, no entanto, a longo prazo haverá outras funcionalidades.

## 🔧 **Tecnologias Utilizadas**
- **Linguagem:** TypeScript
- **Framework:** Fastify
- **ORM:** Drizzle ORM
- **Validação:** Zod
- **Banco de Dados:** PostgreSQL
- **REST API Testing**: Hoppscotch
- **Token de autenticação**> jsonwebtoken

## Próximas funcionalidades

- [x] Disponibilizar fluxo de login
- [x] Disponibilizar fluxo de criação de conta/usuário
- [ ] Disponibilizar fluxo de reset de senha
- [ ] Utilizar do Authorization pra identificar para qual usuário devesse criar a meta
- [ ] Escolher um Design Pattern para padronização do código-fonte

## 📂 **Estrutura do Projeto**
```
  raiz/
  ├── src/                   # Código-fonte principal
  ├──── db/                  # Schemas do banco de dados e uma seed
  ├──── features/            # Métodos para recuperar os dados do banco
  ├──── http/                # Inicialização do servidor
  ├──── middlewares/         # Métodos reutilizados nas rotas
  ├──── routes/              # Criação das rotas e regras de negócio
  ├── .migrations/           # Arquivos que irão alterar o banco 
  ├── .vercel/               # Necessário para hospedar o site               
  └── README.md              # Esse arquivo
```

## ⚙️ **Instalação e Configuração**
### Pré-requisitos
- Node.js v20
- NPM.js v10

### Passo a passo para rodar o projeto:
1. Clone o repositório:
   ```bash
   git clone https://github.com/Rafa-Denlavor/meta-certa-service-web.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor local:
   ```bash
   npm run dev
   ```
4. Inicie o container:
   ```bash
   docker compose up
   ```

<!-- ## 🧪 **Testes**
Para rodar os testes, execute:
```bash
npm test
``` -->

## 📞 **Contato**
Tem perguntas? Entre em contato com a gente:
- **Email**: rafinhacrisdenlavor@gmail.com
- **Site**: [https://denlavor.vercel.app)
