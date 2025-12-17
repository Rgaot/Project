import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from '@testing-library/react'
import { PaymentSummary } from "./PaymentSummray";
import userEvent from '@testing-library/user-event'
import axios from "axios";
import { MemoryRouter, useLocation } from "react-router";

function Location () {
    const location = useLocation();

    return (
        <div data-testId="url-path">
            {location.pathname}
        </div>
    )
}

vi.mock('axios')
describe('PaymentSummary Component', () => {

    let loadCart;
    let paymentsummary;
    let user;

    beforeEach(() => {
        loadCart = vi.fn();
        paymentsummary = {
            "totalItems": 2,
            "productCostCents": 6998,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 6998,
            "taxCents": 700,
            "totalCostCents": 7698
        };
        user = userEvent.setup();
        axios.post.mockImplementation(async (url) => {
            if (url === '/api/orders') {
                return {
                    data: [
                        {
                            "id": "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
                            "orderTimeMs": 1723456800000,
                            "totalCostCents": 3506,
                            "products": [
                                {
                                    "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                                    "quantity": 1,
                                    "estimatedDeliveryTimeMs": 1723716000000
                                },
                                {
                                    "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                                    "quantity": 2,
                                    "estimatedDeliveryTimeMs": 1723456800000
                                }
                            ],
                            "createdAt": "2025-12-17T14:16:18.350Z",
                            "updatedAt": "2025-12-17T14:16:18.350Z"
                        },
                        {
                            "id": "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
                            "orderTimeMs": 1718013600000,
                            "totalCostCents": 4190,
                            "products": [
                                {
                                    "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                                    "quantity": 2,
                                    "estimatedDeliveryTimeMs": 1718618400000
                                }
                            ],
                            "createdAt": "2025-12-17T14:16:18.351Z",
                            "updatedAt": "2025-12-17T14:16:18.351Z"
                        }
                    ]
                }
            }
        })
    });

    it('displays the correct informations', () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentsummary={paymentsummary}
                    loadCart={loadCart} />
            </MemoryRouter>
        )
        const totalItems = screen.getByTestId('total-items');
        const shippingCost = screen.getByTestId('shipping-cost');
        const totalBeforeTax = screen.getByTestId('total-before-tax');
        const estimatedTax = screen.getByTestId('estimated-tax');
        const total = screen.getByTestId('total');

        expect(totalItems).toHaveTextContent(2);
        expect(shippingCost).toHaveTextContent(0);
        expect(totalBeforeTax).toHaveTextContent(69.98);
        expect(estimatedTax).toHaveTextContent(7);
        expect(total).toHaveTextContent(76.98);
    });
    it('place order button', async () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentsummary={paymentsummary}
                    loadCart={loadCart} 
                />
                <Location />
            </MemoryRouter>
        )
        const button = screen.getByTestId('place-order-button');
        await user.click(button).then(() => {
            expect(axios.post).toHaveBeenCalled()
            expect(loadCart).toHaveBeenCalled()
        })
        expect(screen.getByText('/orders')).toBeInTheDocument();
    })
})