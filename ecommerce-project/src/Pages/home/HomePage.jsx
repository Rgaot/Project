import axios from 'axios'
import './HomePage.css';
import { Header } from '../../Components/Header';
import { ProductGrid } from './ProductsGrid';
import { useEffect, useState } from 'react';

export function HomePage({cart, loadCart, search}) {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const fetchHomeData = async() => {
            const response = await axios.get(`/api/products${search ? `?search=${search}` : '' }`);
            setProducts(response.data)
        };
        fetchHomeData();
    }, [search])

    return (
        <>
            <title>Ecommerce project</title>
            <link rel="icon" href="public/images/favicons/home-favicon.png" />

            <Header cart={cart} search={search} />

            <div className="home-page">
                <ProductGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )
}