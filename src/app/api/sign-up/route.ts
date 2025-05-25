import { signUp } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  try {
    const user = await signUp(formData);
    return NextResponse.json({ success: true, user });
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
