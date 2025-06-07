import { signUp } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await signUp(formData);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, user: result.data });
}
