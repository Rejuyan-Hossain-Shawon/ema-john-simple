import React from 'react';

const Cart = (props) => {
    const total = props.cart.reduce((previous, current) => previous + current.price, 0)

    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Item Ordered:{props.cart.length}</h5>
            <br />
            <p>Total:{total}</p>
        </div>
    );
};

export default Cart;