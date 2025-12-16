import { DelivertOptions } from "./DeliveryOptions"
import { CartItemDetails } from "./CartItemDatails"
import { DeliveryDate } from "./DeliveryDate"

export function OrderSummury({ cart, deliveryOptions }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId
                })
                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

                        <div className="cart-item-details-grid">
                            <CartItemDetails cartItem={cartItem} />
                            <DelivertOptions cartItem={cartItem} deliveryOptions={deliveryOptions} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}