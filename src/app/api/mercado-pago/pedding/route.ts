import { Payment } from "mercadopago";
import { NextResponse } from "next/server";
import mpClient from "@/lib/payment/mercado-pago";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');
    const testId = searchParams.get('external_reference');
    if (!paymentId || !testId) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const payment = new Payment(mpClient)
    const paymentData = await payment.get({ id: paymentId })
    if (paymentData.status === "approved" || paymentData.date_approved !== null) {
        return NextResponse.redirect(new URL(`/?status=sucesso`, request.url))
    }
    return NextResponse.redirect(new URL("/", request.url));
}