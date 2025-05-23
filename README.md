# 🌍 Travel Advisor · v1.0

O **Travel Advisor** é uma plataforma inovadora, desenvolvida com **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma** e **PostgreSQL**, com o objetivo de ajudar usuários a **explorar destinos**, **receber recomendações personalizadas de viagem** e **encontrar atrações, hospedagens e restaurantes** ao redor do mundo.

## ✅ Status do Projeto

🚧 Versão **1.0** — Em desenvolvimento  
✅ Sistema de autenticação implementado utilizando **NextAuth.js**, com suporte para:
- Login via **Google**
- Login via **credentials (email/senha)**

---

## ✨ Próximas Funcionalidades

- 🌍 Exploração de destinos com base em localização e preferências
- 🗺️ Integração com mapas para exibir atrações turísticas
- 🏨 Listagem de hospedagens recomendadas
- 🍽️ Sugestões de restaurantes próximos
- 📌 Sistema de avaliações e favoritos

---

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/) (Google & Credentials Providers)
- [Google Maps API](https://developers.google.com/maps)
- [RapidAPI](https://rapidapi.com/)

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/devLuanPaiva/travel-advisor.git
cd TravelAdvisor

# Instale as dependências
npm install

# Crie um arquivo .env.local com as seguintes variáveis de ambiente
```
---

## 🔐 Variáveis de Ambiente

# APIs externas
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_RAPIDAPI_KEY=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Banco de Dados (PostgreSQL)
DATABASE_URL=

⚠️ Certifique-se de que o banco de dados esteja rodando antes de executar as migrações.

---

## 🔄 Migrations
```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## 🏁 Executando o Projeto

``` bash
npm run dev
Acesse em: http://localhost:3000
```

## 🧑‍💻 Contribuição
Contribuições são bem-vindas! 
Sinta-se livre para abrir uma issue ou enviar um pull request.
