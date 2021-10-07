import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"

const Shop = () => {
    // product state
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("./products.JSON")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            })
    }, [])


    // get saved cart
    useEffect(() => {
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);


                }

            }
            setCart(storedCart);
        }


    }, [products])

    // cart state
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.key);
    }
    const [displayProducts, setDisplayProducts] = useState([]);
    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
        setDisplayProducts(matchedProducts);
    }
    return (
        <>
            <div className="search-container">
                <input onChange={handleSearch} type="text" placeholder="search proudct" />
            </div>
            <div className="shop-container">
                <div className="product-conatiner">
                    <h3>Products:{products.length}</h3>
                    {
                        displayProducts.map(product => <Product handleAddToCart={handleAddToCart} key={product.key} product={product}></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-regular">Review Your Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;