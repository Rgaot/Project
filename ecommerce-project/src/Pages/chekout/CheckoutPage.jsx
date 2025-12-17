import '../chekout/CheckoutPage.css'
import { CheckoutHeader } from '../../Components/CheckoutHeader'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { OrderSummury } from './OrderSummary'
import { PaymentSummary } from './PaymentSummray'

window.axios = axios;
export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [paymentsummary, setPaymentSummary] = useState(null)
    useEffect(() => {
        const fetchDeliveryOptions = async () => {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data)
        }
        fetchDeliveryOptions();
    }, []);

    useEffect(() => {
        const fetchPaymentSummary = async () => {
            const response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data)
        };
        fetchPaymentSummary();
    }, [cart]);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" href="public/images/favicons/cart-favicon.png" />

            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">

                    <OrderSummury cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                    <PaymentSummary paymentsummary={paymentsummary} loadCart={loadCart} />
                </div>
            </div>
        </>
    )
}