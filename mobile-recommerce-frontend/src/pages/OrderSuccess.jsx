import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function OrderSuccess() {

    const { id } = useParams();

    const location = useLocation();

    const order =
        location.state?.order;

    return (
        <>
            <Navbar />

            <main className="order-success-page">

                <div className="success-card">

                    <div className="success-icon">
                        ✓
                    </div>

                    <h1>
                        Order Placed Successfully!
                    </h1>

                    <p className="success-message">
                        Thank you for your order.
                        Your mobile order has been
                        placed successfully.
                    </p>

                    <div className="order-success-details">

                        <div>
                            <span>Order ID</span>

                            <strong>
                                #{order?.id || id}
                            </strong>
                        </div>

                        {order?.orderNumber && (

                            <div>
                                <span>
                                    Order Number
                                </span>

                                <strong>
                                    {order.orderNumber}
                                </strong>
                            </div>

                        )}

                        {order?.totalAmount != null && (

                            <div>
                                <span>
                                    Total Amount
                                </span>

                                <strong>
                                    ₹{Number(
                                        order.totalAmount
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>
                            </div>

                        )}

                        {order?.paymentMethod && (

                            <div>
                                <span>
                                    Payment Method
                                </span>

                                <strong>
                                    {order.paymentMethod}
                                </strong>
                            </div>

                        )}

                        {order?.status && (

                            <div>
                                <span>
                                    Order Status
                                </span>

                                <strong>
                                    {order.status}
                                </strong>
                            </div>

                        )}

                    </div>

                    <div className="success-actions">

                        <Link
                            to="/"
                            className="continue-shopping-button"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>

            </main>
        </>
    );
}

export default OrderSuccess;