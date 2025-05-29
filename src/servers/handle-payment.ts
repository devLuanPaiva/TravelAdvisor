import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handlePayment(payment: PaymentResponse) {
    const metadata = payment.metadata;
    const userEmail = metadata.user_email;
    const testeId = metadata.teste_id;

    return { userEmail, testeId };
}