import { formatCurrency } from "../../utils/Money"

export function PaymentSummary({paymentsummary}) {
    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            {paymentsummary && (<>
                <div className="payment-summary-row">
                    <div>Items ({paymentsummary.totalItems}):</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.productCostCents)}</div>
                </div>

                <div className="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.shippingCostCents)}</div>
                </div>

                <div className="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.totalCostBeforeTaxCents)}</div>
                </div>

                <div className="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.taxCents)}</div>
                </div>

                <div className="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div className="payment-summary-money">{formatCurrency(paymentsummary.totalCostCents)}</div>
                </div>

                <button className="place-order-button button-primary">
                    Place your order
                </button>
            </>
            )}

        </div>
    )
}