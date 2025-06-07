import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db/db";

export async function POST(request: NextRequest) {
  const { email, code } = await request.json();
  const user = await db.user.findUnique({ where: { email } });

  if (!user || user.resetToken !== code) {
    return NextResponse.json(
      { success: false, message: "Código inválido, tente novamente" },
      { status: 400 }
    );
  }

  if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) {
    await db.user.delete({ where: { email } });
    return NextResponse.json(
      { success: false, message: "Código expirado, tente novamente" },
      { status: 400 }
    );
  }
  await db.user.update({
    where: { email },
    data: {
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
  return NextResponse.json(
    { success: true, message: "Usuário cadastrado com sucesso" },
    { status: 200 }
  );
}
