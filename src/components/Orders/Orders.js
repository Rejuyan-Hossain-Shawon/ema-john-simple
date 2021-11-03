import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();
    const history = useHistory();
    useEffect(() => {
        // https://evil-treat-41252.herokuapp.com/orders?email=${user.email}
        // http://localhost:5000/orders?email=${user.email}
        fetch(`https://evil-treat-41252.herokuapp.com/orders?email=${user.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem("idToken")}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    history.push('/login');
                }
            })
            .then(data => setOrders(data))
    }, [])

    return (
        <div>
            <h2>You have placed {orders.length} orders</h2>
            <ul>
                {
                    orders.map(order => <li>{order.name}:{order.email}</li>)
                }
            </ul>

        </div>
    );
};

export default Orders;