import './Header.css';
import SearchIcon from "../assets/images/icons/search-icon.png";
import CartIcon from '../assets/images/icons/cart-icon.png';
import { NavLink } from 'react-router';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function Header({cart}) {
    const [inputText, setInputText] = useState();
    const navigate = useNavigate();

    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    const changeInputText = (event) => {
        setInputText(event.target.value);
    };

    const searchProduct = async () => {
        await navigate(`/?search=${inputText}`);
    };
    
    return (
        <>

            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo"
                            src="images/logo-white.png" />
                        <img className="mobile-logo"
                            src="images/mobile-logo-white.png" />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" onChange={changeInputText} />

                    <button className="search-button" onClick={searchProduct}>
                        <img className="search-icon" src={SearchIcon} />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">

                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src={CartIcon} />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}