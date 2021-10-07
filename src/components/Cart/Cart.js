import React from 'react';

const Cart = (props) => {

    // const total = props.cart.reduce((previous, current) => previous + current.price, 0)
    // we can implement this code via reduce also but for better understanding in begainer level we go through for
    let totalQuantity = 0;
    let total = 0;
    for (const product of props.cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    let shipping = 0;
    let tax = 0;
    if (total > 0) {
        shipping = 15;
        tax = (total + shipping) * 0.1;
    }


    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Item Ordered:{totalQuantity}</h5>
            <br />
            <p>Total: ${total.toFixed(2)}</p>
            <p>Shiping: ${shipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>GrandTotal: ${grandTotal.toFixed(2)}</p>
            {props.children}
        </div>
    );
};

export default Cart;