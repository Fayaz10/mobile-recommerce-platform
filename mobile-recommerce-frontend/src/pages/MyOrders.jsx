import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getMyOrders } from "../services/api";

function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        getMyOrders()
            .then((data) => {

                console.log(
                    "My orders:",
                    data
                );

                setOrders(data);

            })
            .catch((error) => {

                console.error(error);

                setError(
                    error.message ||
                    "Unable to load orders."
                );

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);


    // -----------------------------
    // LOADING
    // -----------------------------

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="page-message">
                    Loading your orders...
                </div>
            </>
        );

    }


    // -----------------------------
    // ERROR
    // -----------------------------

    if (error) {

        return (
            <>
                <Navbar />

                <div className="page-message">

                    <h2>
                        Unable to load orders
                    </h2>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/"
                        className="view-button"
                    >
                        Continue Shopping
                    </Link>

                </div>
            </>
        );

    }


    // -----------------------------
    // PAGE
    // -----------------------------

    return (

        <>
            <Navbar />

            <main className="orders-page">

                <div className="orders-header">

                    <div>

                        <h1>
                            My Orders
                        </h1>

                        <p>
                            View and track your orders
                        </p>

                    </div>

                    <Link
                        to="/"
                        className="continue-shopping-link"
                    >
                        ← Continue Shopping
                    </Link>

                </div>


                {/* EMPTY ORDERS */}

                {orders.length === 0 ? (

                    <div className="empty-orders">

                        <div className="empty-orders-icon">
                            📦
                        </div>

                        <h2>
                            No orders yet
                        </h2>

                        <p>
                            You haven't placed any orders yet.
                        </p>

                        <Link
                            to="/"
                            className="view-button"
                        >
                            Start Shopping
                        </Link>

                    </div>

                ) : (

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order.id}
                            >

                                <div className="order-card-header">

                                    <div>

                                        <span className="order-label">
                                            Order Number
                                        </span>

                                        <strong>
                                            {order.orderNumber}
                                        </strong>

                                    </div>

                                    <span
                                        className={
                                            `order-status ${
                                                order.orderStatus
                                                    ?.toLowerCase()
                                            }`
                                        }
                                    >
                                        {order.orderStatus}
                                    </span>

                                </div>


                                <div className="order-card-body">

                                    <div>

                                        <span className="order-label">
                                            Order ID
                                        </span>

                                        <strong>
                                            #{order.id}
                                        </strong>

                                    </div>


                                    <div>

                                        <span className="order-label">
                                            Payment
                                        </span>

                                        <strong>
                                            {order.paymentMethod}
                                        </strong>

                                    </div>


                                    <div>

                                        <span className="order-label">
                                            Total
                                        </span>

                                        <strong>
                                            ₹{Number(
                                                order.totalAmount
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>

                                </div>


                                <div className="order-card-footer">

                                    <Link
                                        to={`/orders/${order.id}`}
                                        className="view-order-button"
                                    >
                                        View Order Details
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </>

    );

}

export default MyOrders;