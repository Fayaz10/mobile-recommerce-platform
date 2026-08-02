import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getMyOrderById } from "../services/api";

function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const BACKEND_URL = "http://localhost:8080";

    function getImageUrl(imageUrl) {

        if (!imageUrl) {
            return null;
        }

        if (
            imageUrl.startsWith("http://") ||
            imageUrl.startsWith("https://")
        ) {
            return imageUrl;
        }

        return `${BACKEND_URL}${
            imageUrl.startsWith("/")
                ? imageUrl
                : `/${imageUrl}`
        }`;
    }


    useEffect(() => {

        getMyOrderById(id)

            .then((data) => {

                console.log(
                    "Order details:",
                    data
                );

                setOrder(data);

            })

            .catch((error) => {

                console.error(error);

                setError(
                    error.message ||
                    "Unable to load order."
                );

            })

            .finally(() => {

                setLoading(false);

            });

    }, [id]);


    // =============================
    // LOADING
    // =============================

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="page-message">
                    Loading order details...
                </div>
            </>
        );
    }


    // =============================
    // ERROR
    // =============================

    if (error || !order) {

        return (
            <>
                <Navbar />

                <div className="page-message">

                    <h2>
                        Unable to load order
                    </h2>

                    <p>
                        {error}
                    </p>

                    <Link to="/orders">
                        Back to My Orders
                    </Link>

                </div>
            </>
        );
    }


    const items =
        order.items || [];


    return (

        <>
            <Navbar />

            <main className="order-details-page">


                {/* TOP */}

                <div className="order-details-top">

                    <div>

                        <Link
                            to="/orders"
                            className="back-orders-link"
                        >
                            ← Back to My Orders
                        </Link>

                        <h1>
                            Order Details
                        </h1>

                        <p>
                            Order {order.orderNumber}
                        </p>

                    </div>


                    <span
                        className={
                            `order-status ${
                                order.status
                                  ?.toLowerCase()
                            }`
                        }
                    >
                        {order.status || "N/A"}
                    </span>

                </div>


                <div className="order-details-layout">


                    {/* LEFT SIDE */}

                    <div className="order-details-main">


                        {/* ORDER ITEMS */}

                        <section className="order-details-card">

                            <h2>
                                Items in your order
                            </h2>


                            {items.map((item) => (

                                <div
                                    className="order-product"
                                    key={item.id}
                                >


                                    <div className="order-product-image">

                                        {item.imageUrl ? (

                                            <img
                                                src={getImageUrl(
                                                    item.imageUrl
                                                )}
                                                alt={item.productName}
                                            />

                                        ) : (

                                            <span>
                                                📱
                                            </span>

                                        )}

                                    </div>


                                    <div className="order-product-info">

                                        <h3>
                                             {item.productName}
                                        </h3>

                                        {item.color && (
                                            <p>
                                                 {item.color}
                                           </p>
                                        )}

                                        {item.conditionType && (
                                            <span className="condition">
                                                {item.conditionType}
                                            </span>
                                        )}
                                        
                                        <p>
                                            Product ID: {item.productId}
                                        </p>

                                        <p>
                                           ₹{Number(
                                                item.unitPrice || 0
                                            ).toLocaleString("en-IN")} each
                                        </p>


                                    </div>


                                    <div className="order-product-price">

                                        <strong>
                                            ₹{Number(
                                                item.subtotal ||
                                                item.unitPrice ||
                                                0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                        <span>
                                            Qty: {item.quantity}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </section>


                        {/* DELIVERY ADDRESS */}

                        <section className="order-details-card">

                            <h2>
                                Delivery Address
                            </h2>


                            {order.deliveryAddress ? (

                                <div className="delivery-address">

                                    <strong>
                                        {
                                            order.deliveryAddress
                                                .fullName
                                        }
                                    </strong>

                                    <p>
                                        {
                                            order.deliveryAddress
                                                .addressLine1
                                        }
                                    </p>

                                    {order.deliveryAddress
                                        .addressLine2 && (

                                        <p>
                                            {
                                                order.deliveryAddress
                                                    .addressLine2
                                            }
                                        </p>

                                    )}

                                    <p>
                                        {
                                            order.deliveryAddress
                                                .city
                                        },{" "}

                                        {
                                            order.deliveryAddress
                                                .state
                                        } -{" "}

                                        {
                                            order.deliveryAddress
                                                .postalCode
                                        }
                                    </p>

                                    <p>
                                        {
                                            order.deliveryAddress
                                                .country
                                        }
                                    </p>

                                    <p>
                                        Phone:{" "}
                                        {
                                            order.deliveryAddress
                                                .phone
                                        }
                                    </p>

                                </div>

                            ) : (

                                <p>
                                    Delivery address not available.
                                </p>

                            )}

                        </section>

                    </div>


                    {/* RIGHT SIDE */}

                    <aside className="order-summary-card">

                        <h2>
                            Order Summary
                        </h2>


                        <div className="order-summary-row">

                            <span>
                                Order ID
                            </span>

                            <strong>
                                #{order.id}
                            </strong>

                        </div>


                        <div className="order-summary-row">

                            <span>
                                Order Number
                            </span>

                            <strong>
                                {order.orderNumber}
                            </strong>

                        </div>


                        <div className="order-summary-row">

                            <span>
                                Payment
                            </span>

                            <strong>
                                {order.paymentMethod}
                            </strong>

                        </div>


                        <div className="order-summary-row">

                            <span>
                                Status
                            </span>

                            <strong>
                                {order.status || "N/A"}
                            </strong>

                        </div>


                        <hr />


                        <div className="order-summary-row total">

                            <span>
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


                        <Link
                            to="/"
                            className="order-shop-button"
                        >
                            Continue Shopping
                        </Link>

                    </aside>

                </div>

            </main>

        </>

    );
}

export default OrderDetails;