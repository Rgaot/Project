import axios from 'axios'
import './HomePage.css';
import { Header } from '../../Components/Header';
import { ProductGrid } from './ProductsGrid';
import { useEffect, useState } from 'react';

export function HomePage({cart}) {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data)
            });
   
    }, [])
    console.log(products)

    return (
        <>
            <title>Ecommerce project</title>
            <link rel="icon" href="public/images/favicons/home-favicon.png" />

            <Header cart={cart}/>

            <div className="home-page">
                <ProductGrid products={products}/>
            </div>
        </>
    )
}