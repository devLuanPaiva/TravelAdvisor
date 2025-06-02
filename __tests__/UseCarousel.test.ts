import { useCarousel } from "@/hooks/useCarousel";
import { renderHook, act } from "@testing-library/react";

jest.useFakeTimers()

describe("UseCarousel", () => {
    const elements = ['A', 'B', 'C']

    it("should start with the first element", () => {
        const { result } = renderHook(() => useCarousel({ elements, intervalTime: 1000 }))
        expect(result.current.current).toBe(0)
    })
    it("should change the current element every interval time", () => {
        const { result } = renderHook(() => useCarousel({ elements, intervalTime: 1000 }))
        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.current).toBe(1)

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.current).toBe(2)

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(result.current.current).toBe(0)
    })
    it("should go to the next one manually with handleNext()", () => {
        const { result } = renderHook(() => useCarousel({ elements, intervalTime: 1000 }))
        act(() => {
            result.current.handleNext()
        })

        expect(result.current.current).toBe(1)
    })
})