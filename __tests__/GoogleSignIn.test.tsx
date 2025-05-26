;
import { render, screen } from "@testing-library/react";
import { GoogleSignIn } from "../src/components/auth/GoogleSigIn";
import '@testing-library/jest-dom';


jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}))

describe("GoogleSignIn Component", () => {
    it("render the button with correct text", () => {
        render(<GoogleSignIn />)
        expect(screen.getByRole("button", { name: /entrar com google/i })).toBeInTheDocument();
    })
})