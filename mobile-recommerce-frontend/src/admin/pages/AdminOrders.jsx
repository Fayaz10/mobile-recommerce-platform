import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    getAdminOrders
} from "../../services/api";


function AdminOrders() {

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        loadOrders();

    }, []);


    async function loadOrders() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAdminOrders();

            setOrders(data);

        } catch (err) {

            setError(
                err.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);
        }
    }


    function formatPrice(value) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(value || 0);
    }


    function formatDate(date) {

        if (!date) {
            return "-";
        }

        return new Date(date)
            .toLocaleString("en-IN");
    }


    return (

        <>

            <main className="admin-orders-page">

                <div className="admin-orders-container">

                    <div className="admin-orders-header">

                        <div>

                            <h1>
                                Admin Orders
                            </h1>

                            <p>
                                Manage customer orders
                                and order status
                            </p>

                        </div>

                        <Link
                            to="/"
                            className="profile-home-link"
                        >
                            ← Back to Home
                        </Link>

                    </div>


                    {loading && (

                        <p>
                            Loading orders...
                        </p>

                    )}


                    {error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )}


                    {!loading &&
                     !error &&
                     orders.length === 0 && (

                        <div className="admin-empty-orders">

                            <h3>
                                No orders found
                            </h3>

                            <p>
                                Customer orders will
                                appear here.
                            </p>

                        </div>

                    )}


                    {!loading &&
                     !error &&
                     orders.length > 0 && (

                        <div className="admin-orders-list">

                            {orders.map(
                                (order) => (

                                <div
                                    className="admin-order-card"
                                    key={order.id}
                                >

                                    <div className="admin-order-top">

                                        <div>

                                            <span className="admin-order-label">
                                                Order Number
                                            </span>

                                            <h3>
                                                {order.orderNumber}
                                            </h3>

                                        </div>

                                        <span
                                            className={
                                                "admin-order-status " +
                                                (
                                                    order.status ||
                                                    ""
                                                )
                                                .toLowerCase()
                                            }
                                        >
                                            {order.status}
                                        </span>

                                    </div>


                                    <div className="admin-order-info">

                                        <div>

                                            <span>
                                                Order ID
                                            </span>

                                            <strong>
                                                #{order.id}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Date
                                            </span>

                                            <strong>
                                                {
                                                    formatDate(
                                                        order.createdAt
                                                    )
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Payment
                                            </span>

                                            <strong>
                                                {
                                                    order.paymentMethod
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Total
                                            </span>

                                            <strong>
                                                {
                                                    formatPrice(
                                                        order.totalAmount
                                                    )
                                                }
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="admin-order-actions">

                                        <Link
                                            to={
                                                `/admin/orders/${order.id}`
                                            }
                                            className="admin-view-order-button"
                                        >
                                            View Order Details
                                        </Link>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>

        </>

    );
}


export default AdminOrders;