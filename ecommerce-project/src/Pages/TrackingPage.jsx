import { Header } from "../Components/Header"
import './TrackingPage.css'
import { Link } from "react-router"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from 'axios'
import dayjs from 'dayjs'

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        };
        fetchTrackingData();
    }, [orderId]);

    if (!order) {
        return null
    };

    const machingProductDetails = order.products.find((product) => {
        return product.productId === productId
    });

    const totalDeliveryTimeMS = (machingProductDetails.estimatedDeliveryTimeMs - order.orderTimeMs);
    const timePassedMS = (dayjs().valueOf() - order.orderTimeMs);
    const deliveryProgress = (timePassedMS / totalDeliveryTimeMS)*100;
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
                        {`${deliveryProgress >= 100 ? 'Deliverd on' : 'Arriving on'} : ${dayjs(machingProductDetails.estimatedDeliveryTimeMs).format('dddd, MMMM D')}`}
                    </div>

                    <div className="product-info">
                        {machingProductDetails.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {machingProductDetails.quantity}
                    </div>

                    <img className="product-image" src={machingProductDetails.product.image} />

                    <div className="progress-labels-container">
                        <div 
                            className={`progress-label ${deliveryProgress < 33 ? 'current-status' : ''}`}
                        >
                            Preparing
                        </div>
                        <div 
                            className={`progress-label ${deliveryProgress >= 33 && deliveryProgress < 100 ? 'current-status' : ''}`}
                        >
                            Shipped
                        </div>
                        <div 
                            className={`progress-label ${deliveryProgress === 100 ? 'current-status' : ''}`}
                        >
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${deliveryProgress}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    )
}