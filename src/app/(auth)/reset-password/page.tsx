"use client";

import { resetPassword } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, formAction] = useFormState(resetPassword, null);

  if (!token) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Invalid Token</h1>
        <p>The password reset link is invalid or has expired.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="token" value={token} />
        <div>
          <label htmlFor="newPassword" className="block mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Reset Password
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
