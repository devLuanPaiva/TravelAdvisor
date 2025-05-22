import { schema } from "@/lib/schema";
import db from "@/lib/db/db";
import executeAction from "./executeAction";

const signUp = async (formData: FormData) => {
    return executeAction({
        actionFn: async () => {
            const email = formData.get("email")?.toString();
            const password = formData.get("password")?.toString();

            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            const validatedData = schema.parse({ email, password });

            const existingUser = await db.user.findUnique({
                where: { email: validatedData.email.toLowerCase() }
            });

            if (existingUser) {
                throw new Error("User already exists");
            }

            const newUser = await db.user.create({
                data: {
                    email: validatedData.email.toLowerCase(),
                    password: validatedData.password,
                },
            });

            return newUser;
        },
        successMessage: "Signed up successfully",
    });
};

export { signUp };