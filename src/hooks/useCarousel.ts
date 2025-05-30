"use client"
import { useEffect, useState } from "react";
interface Props<T = unknown> {
    elements: T[];
    intervalTime: number;
}

export function useCarousel({ elements, intervalTime }: Props) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % elements.length);
        }, intervalTime);
        return () => clearInterval(timer);
    }, [elements.length, intervalTime]);

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + elements.length) % elements.length);
    };

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % elements.length);
    };

    return {
        current,
        setCurrent,
        handlePrev,
        handleNext
    }
}