import '../chekout/CheckoutPage.css'
import { CheckoutHeader } from '../../Components/CheckoutHeader'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { OrderSummury } from './OrderSummary'
import { PaymentSummary } from './PaymentSummray'

export function CheckoutPage({ cart,loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [paymentsummary, setPaymentSummary] = useState(null)
    useEffect(() => {
        const fetchDeliveryOptions = async() => {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data)
        }
        const fetchPaymentSummary = async() => {
            const response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data)
        }
        fetchDeliveryOptions();
        fetchPaymentSummary();
    }, [cart])
    return (
        <>
            <title>Checkout</title>
            <link rel="icon" href="public/images/favicons/cart-favicon.png" />

            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">

                        <OrderSummury cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                        <PaymentSummary paymentsummary={paymentsummary} />
                </div>
            </div>
        </>
    )
}