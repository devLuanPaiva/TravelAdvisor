import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
    actionFn: () => Promise<T>;
    successMessage?: string;
}

const executeAction = async <T>({ actionFn, successMessage = "The action was successful" }: Options<T>) => {
    try {
        const result = await actionFn();
        return {
            success: true,
            message: successMessage,
            data: result
        }
    } catch (error) {
        if (isRedirectError(error)) {
            return {
                success: true,
                message: "Redirecting...",
                redirect: true
            }
        }
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        console.error("Action error:", error);

        return {
            success: false,
            message: errorMessage
        }
    }
}

export default executeAction;