import '../chekout/CheckoutPage.css'
import { CheckoutHeader } from '../../Components/CheckoutHeader'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { OrderSummury } from './OrderSummary'
import { PaymentSummary } from './PaymentSummray'

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [paymentsummary, setPaymentSummary] = useState(null)
    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDeliveryOptions(response.data)
            })
        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data)
            })
    }, [])
    return (
        <>
            <title>Checkout</title>
            <link rel="icon" href="public/images/favicons/cart-favicon.png" />

            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">

                        <OrderSummury cart={cart} deliveryOptions={deliveryOptions} />

                        <PaymentSummary paymentsummary={paymentsummary} />
                </div>
            </div>
        </>
    )
}