import { useEffect, useState } from "react"
import Product from "../components/Product/Product";
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getStoredCart();
        const keys = Object.keys(savedCart);

        fetch("https://evil-treat-41252.herokuapp.com/products/bykeys", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {

                if (products.length) {


                    const storedCart = [];
                    for (const key in savedCart) {
                        const addedProduct = products.find(product => product.key === key);
                        if (addedProduct) {
                            //  set quantity 
                            const quantity = savedCart[key];
                            addedProduct.quantity = quantity;
                            storedCart.push(addedProduct);
                        }
                    }
                    setCart(storedCart);


                }
            })



    }, [])
    return [cart, setCart]
}
export default useCart;