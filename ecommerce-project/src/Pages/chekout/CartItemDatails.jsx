import { formatCurrency } from "../../utils/Money";
import axios from "axios"
import { useState } from "react";

export function CartItemDetails({cartItem, loadCart}) {
    const [isBeeingChanged, setIsBeeingChanged] = useState(false);
    const [quantity, setQuantity] = useState(1)
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart()
    }
    const showInput = async () => {
        if (!isBeeingChanged) {
            setIsBeeingChanged(true)     
        } else {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: quantity
            });
            await loadCart()
            setIsBeeingChanged(false)
        }
    }
    const changeQuantityEnter = async (event) => {
        if (event.key === 'Enter' && isBeeingChanged) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: quantity
            });
            await loadCart()
            setIsBeeingChanged(false)
        } else if (event.key === 'Escape') {
            setQuantity(cartItem.quantity)
            setIsBeeingChanged(false)
        }
    }
    const changeQuantity = async (event) => {
        setQuantity(Number(event.target.value));
    }
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatCurrency(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: 
                        <input 
                            type="text" 
                            className="quantity-input" 
                            style={{display: `${isBeeingChanged ? 'inline-block' : 'none'}`}}
                            value={quantity}
                            onChange={changeQuantity}
                            onKeyDown={changeQuantityEnter}
                        /> 
                        <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span 
                        className="update-quantity-link link-primary"
                        onClick={showInput}
                    >
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}