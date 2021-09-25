import React from 'react';

const Cart = (props) => {
    const total = props.cart.reduce((previous, current) => previous + current.price, 0)
    const shipping = 15;
    const tax = (total + shipping) * 0.1;
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Item Ordered:{props.cart.length}</h5>
            <br />
            <p>Total: ${total.toFixed(2)}</p>
            <p>Shiping: ${shipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>GrandTotal: ${grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;