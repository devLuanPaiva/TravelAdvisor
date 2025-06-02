import { useCarousel } from "@/hooks/useCarousel";
import { renderHook } from "@testing-library/react";

jest.useFakeTimers()

describe("UseCarousel", () => {
    const elements = ['A', 'B', 'C']

    it("should start with the first element", () => {
        const { result } = renderHook(() => useCarousel({ elements, intervalTime: 1000 }))
        expect(result.current.current).toBe(0)
    })
})