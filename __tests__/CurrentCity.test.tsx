import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import { CurrentCity } from '../src/components/geolcation/CurrentCity';

jest.mock("react-icons/md", () => ({
    MdLocationOn: () => <span>📍</span>,
}))

describe("CurrentCity Component", () => {
    const mockGeolocation = {
        getCurrentPosition: jest.fn(),
    };

    beforeAll(() => {
        // @ts-ignore
        global.navigator.geolocation = mockGeolocation;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("display the correct city when geolocation is supported", async () => {
        const fakePosition = {
            coords: {
                latitude: -5.7945,
                longitude: -35.211,
            },
        };

        mockGeolocation.getCurrentPosition.mockImplementationOnce((success) => {
            success(fakePosition);
        })

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: async () => ({
                address: { city: "Natal" },
            }),
        });
        render(<CurrentCity />);
        await waitFor(() => {
            expect(screen.getByText("Natal")).toBeInTheDocument();
        })
    })
})