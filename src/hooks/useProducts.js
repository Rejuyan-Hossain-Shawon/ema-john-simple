import React, { useEffect, useState } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {

        fetch("https://evil-treat-41252.herokuapp.com/products")
            .then(res => res.json())
            .then(data => setProducts(data.products))

    }, [])
    //    return neccessary thing by array 
    return [products];
};

export default useProducts;