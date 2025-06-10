import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
};

const executeAction = async <T>({
  actionFn,
  successMessage = "Operação realizada com sucesso",
}: Options<T>) => {
  try {
    const result = await actionFn();
    return {
      success: true,
      message: successMessage,
      data: result,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      return {
        success: true,
        message: "Redirecionando...",
        redirect: true,
      };
    }
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Um erro ocorreu durante a operação";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export default executeAction;
