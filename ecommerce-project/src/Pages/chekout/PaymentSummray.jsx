import { formatCurrency } from "../../utils/Money";
import axios from "axios";
import { useNavigate } from "react-router";

export function PaymentSummary({paymentsummary, loadCart}) {
    const navigate = useNavigate();
    const createOrder = async () => {
        await axios.post(`/api/orders`);
        await loadCart();
        navigate('/orders')
    }
    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            {paymentsummary && (<>
                <div className="payment-summary-row" data-testId="total-items" >
                    <div>Items ({paymentsummary.totalItems}):</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.productCostCents)}</div>
                </div>

                <div className="payment-summary-row" data-testId="shipping-cost">
                    <div>Shipping &amp; handling:</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.shippingCostCents)}</div>
                </div>

                <div className="payment-summary-row subtotal-row" data-testId="total-before-tax" >
                    <div>Total before tax:</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.totalCostBeforeTaxCents)}</div>
                </div>

                <div className="payment-summary-row" data-testId="estimated-tax">
                    <div>Estimated tax (10%):</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.taxCents)}</div>
                </div>

                <div className="payment-summary-row total-row" data-testId="total">
                    <div>Order total:</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.totalCostCents)}</div>
                </div>

                <button className="place-order-button button-primary" onClick={createOrder} data-testId="place-order-button">
                    Place your order
                </button>
            </>
            )}

        </div>
    )
}