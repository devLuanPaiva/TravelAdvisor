# 🌍 Travel Advisor

O **Travel Advisor** é uma plataforma inovadora, desenvolvida com **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma** e **PostgreSQL**, com o objetivo de ajudar usuários a **explorar destinos**, **receber recomendações personalizadas de viagem** e **encontrar atrações, hospedagens e restaurantes** ao redor do mundo.

## ✅ Status do Projeto

🚧 Versão **3.0** — Em desenvolvimento  
✅ Sistema de autenticação implementado utilizando **NextAuth.js**, com suporte para:

- Login via **Google**
- Login via **credentials (email/senha)**
- Envios de email via **Resend API**

## ✅ Integração com mapas para exibir locais mais próximos, dando sugestões de restaurantes, bares, postos e etc.

✅ Integração com a api do **Mercado Pago** para relizar pagamentos.

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
- [Jest](https://jestjs.io/pt-BR/)
- [Mercado Pago](https://www.mercadopago.com.br/developers/pt)
- [Resend](https://resend.com/)

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

### APIs externas

- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
- NEXT_PUBLIC_RAPIDAPI_KEY=

### NextAuth

- NEXTAUTH_URL=
- NEXTAUTH_SECRET=

- GOOGLE_CLIENT_ID=
- GOOGLE_CLIENT_SECRET=

### Banco de Dados (PostgreSQL)

- DATABASE_URL=

⚠️ Certifique-se de que o banco de dados esteja rodando antes de executar as migrações.

### Mercado Pago

- MERCADO_PAGO_ACCESS_TOKEN=
- MERCADO_PAGO_WEBHOOK_SECRET=
- NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=

### Resend configuration

- RESEND_API_KEY=

---

## 🔄 Migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## 🏁 Executando o Projeto

```bash
npm run dev
Acesse em: http://localhost:3000
```

## 🌌 Interfaces

![interfaces](https://ik.imagekit.io/p0mm3nebo/travelAdvisor/Group%208.jpg?updatedAt=1749772746299)

![interfaces](https://ik.imagekit.io/p0mm3nebo/travelAdvisor/Group%2012.jpg?updatedAt=1749772746345)

![interfaces](https://ik.imagekit.io/p0mm3nebo/travelAdvisor/Group%209.jpg?updatedAt=1749772746254)

![interfaces](https://ik.imagekit.io/p0mm3nebo/travelAdvisor/Group%2011.jpg?updatedAt=1749772746205)

![interfaces](https://ik.imagekit.io/p0mm3nebo/travelAdvisor/Group%2013.jpg?updatedAt=1749772746279)

## 🧑‍💻 Contribuição

Contribuições são bem-vindas!
Sinta-se livre para abrir uma issue ou enviar um pull request.
