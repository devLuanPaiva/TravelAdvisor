import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/lib/payment/mercado-pago";

export async function POST(req: NextRequest) {
  const { testeId, userEmail } = await req.json();

  try {
    const preference = new Preference(mpClient);

    const createdPreference = await preference.create({
      body: {
        external_reference: testeId, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        metadata: {
          testeId, // O Mercado Pago converte para snake_case, ou seja, testeId vai virar teste_id
          // userEmail: userEmail,
          // plan: '123'
          //etc
        },
        ...(userEmail && {
          payer: {
            email: userEmail,
          },
        }),

        items: [
          {
            id: "#5408113818",
            description: "Vivência com comunidades ribeirinhas e passeios fluviais.",
            title: "Natureza Selvagem na Amazônia",
            quantity: 1,
            unit_price: 3990.0,
            currency_id: "BRL",
            category_id: "travel",
          },
          {
            id: "#5414404124",
            title: "Aventura na Patagônia",
            description: "Explore montanhas, geleiras e a fauna do sul da América.",
            quantity: 1,
            unit_price: 4599.0,
            currency_id: "BRL",
            category_id: "travel",
          },
          {
            id: "#5414416932",
            title: "Romance em Paris",
            description: "Hospedagem, passeios e jantar com vista para a Torre Eiffel.",
            quantity: 1,
            unit_price: 7999.0,
            currency_id: "BRL",
            category_id: "travel",
          },
          {
            id: "#5414442924",
            title: "Cultura e História no Egito",
            description: "Conheça as pirâmides, museus e o rio Nilo em um só pacote.",
            quantity: 1,
            unit_price: 6890.0,
            currency_id: "BRL",
            category_id: "travel",
          },
          {
            id: "#5414506280",
            title: "Paraíso em Fernando de Noronha",
            description: "Pacote completo com mergulho, trilhas e praias paradisíacas.",
            quantity: 1,
            unit_price: 2999.0,
            currency_id: "BRL",
            category_id: "travel",
          },
        ],
        payment_methods: {
          // Descomente para desativar métodos de pagamento
          //   excluded_payment_methods: [
          //     {
          //       id: "bolbradesco",
          //     },
          //     {
          //       id: "pec",
          //     },
          //   ],
          //   excluded_payment_types: [
          //     {
          //       id: "debit_card",
          //     },
          //     {
          //       id: "credit_card",
          //     },
          //   ],
          installments: 12, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/?status=sucesso`,
          failure: `${req.headers.get("origin")}/?status=falha`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`, // Criamos uma rota para lidar com pagamentos pendentes
        },
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}