"use client";

import { requestPasswordReset } from "@/lib/actions";
import { useFormState } from "react-dom";

const requestPasswordResetWithForm = async (prevState: unknown, formData: FormData) => {
  const emailValue = formData.get("email");
  const email = typeof emailValue === "string" ? emailValue : "";
  return await requestPasswordReset(email);
};

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(requestPasswordResetWithForm, null);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
        {state?.message && (
          <p
            className={`mt-4 ${
              state.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
