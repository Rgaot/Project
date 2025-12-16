import { Header } from "../Components/Header"
import './TrackingPage.css'
import { Link } from "react-router"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from 'axios'
import dayjs from 'dayjs'

export function TrackingPage({cart}) {
    const {orderId, productId} = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchTrackingData = async() => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        };
        fetchTrackingData();
    }, [orderId])

    if(!order) {
        return null
    }
    const machingProductDetails = order.products.find((product) => {
        return product.productId === productId
    })
    console.log(order)
    return (
          <>
            <title>Tracking</title>
            <link rel="icon" href="public/images/favicons/tracking-favicon.png" />

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {dayjs(machingProductDetails.estimatedDeliveryTimeMS).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {machingProductDetails.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {machingProductDetails.quantity}
                    </div>

                    <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}