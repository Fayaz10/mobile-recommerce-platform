import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import {
    getAdminOrderById,
    updateAdminOrderStatus
} from "../../services/api";


function AdminOrderDetails() {

    const { id } = useParams();

    const [order, setOrder] =
        useState(null);

    const [selectedStatus, setSelectedStatus] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [updating, setUpdating] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    useEffect(() => {

        loadOrder();

    }, [id]);


    async function loadOrder() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAdminOrderById(id);

            setOrder(data);

            setSelectedStatus(
                data.status || ""
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to load order"
            );

        } finally {

            setLoading(false);
        }
    }


    function getAllowedStatuses(
        currentStatus
    ) {

        switch (currentStatus) {

            case "PLACED":

                return [
                    "CONFIRMED",
                    "CANCELLED"
                ];


            case "CONFIRMED":

                return [
                    "SHIPPED",
                    "CANCELLED"
                ];


            case "SHIPPED":

                return [
                    "DELIVERED"
                ];


            default:

                return [];
        }
    }


    async function handleStatusUpdate() {

        if (!selectedStatus) {
            return;
        }

        if (selectedStatus === order.status) {

            setError(
                "Please select a new status."
            );

            return;
        }

        try {

            setUpdating(true);

            setError("");
            setSuccess("");

            const updatedOrder =
                await updateAdminOrderStatus(
                    order.id,
                    selectedStatus
                );

            setOrder(updatedOrder);

            setSelectedStatus(
                updatedOrder.status
            );

            setSuccess(
                "Order status updated successfully."
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to update order status"
            );

        } finally {

            setUpdating(false);
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


    if (loading) {

        return (

            <>

                <main className="admin-order-details-page">

                    <div className="admin-order-details-container">

                        <p>
                            Loading order details...
                        </p>

                    </div>

                </main>

            </>

        );
    }


    if (error && !order) {

        return (

            <>

                <main className="admin-order-details-page">

                    <div className="admin-order-details-container">

                        <Link
                            to="/admin/orders"
                            className="profile-home-link"
                        >
                            ← Back to Admin Orders
                        </Link>

                        <div className="error-message">

                            {error}

                        </div>

                    </div>

                </main>

            </>

        );
    }


    if (!order) {

        return null;
    }


    const allowedStatuses =
        getAllowedStatuses(
            order.status
        );


    return (

        <>

            <main className="admin-order-details-page">

                <div className="admin-order-details-container">


                    <Link
                        to="/admin/orders"
                        className="profile-home-link"
                    >
                        ← Back to Admin Orders
                    </Link>


                    <div className="admin-order-details-header">

                        <div>

                            <h1>
                                Order Details
                            </h1>

                            <p>
                                Order {order.orderNumber}
                            </p>

                        </div>


                        <span
                            className={
                                "admin-order-status " +
                                (
                                    order.status ||
                                    ""
                                ).toLowerCase()
                            }
                        >
                            {order.status}
                        </span>

                    </div>


                    {error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )}


                    {success && (

                        <div className="admin-success-message">

                            {success}

                        </div>

                    )}


                    <div className="admin-order-details-grid">


                        <div className="admin-order-main-column">


                            <section className="admin-details-card">

                                <h2>
                                    Items in this order
                                </h2>


                                {order.items?.map(
                                    (item) => (

                                    <div
                                        className="admin-order-item"
                                        key={item.id}
                                    >

                                        {item.imageUrl && (

                                           <img
    className="admin-order-product-image"
    src={
        item.imageUrl
            ? item.imageUrl.startsWith("http")
                ? item.imageUrl
                : `http://localhost:8080${item.imageUrl}`
            : "/placeholder-phone.png"
    }
    alt={item.productName}
/>
                                        )}


                                        <div className="admin-order-item-info">

                                            <h3>
                                                {item.productName}
                                            </h3>

                                            {item.color && (

                                                <p>
                                                    {item.color}
                                                </p>

                                            )}

                                            {item.conditionType && (

                                                <span className="condition-badge">

                                                    {
                                                        item.conditionType
                                                    }

                                                </span>

                                            )}

                                            <p>
                                                Product ID:{" "}
                                                {item.productId}
                                            </p>

                                            <p>
                                                {
                                                    formatPrice(
                                                        item.unitPrice
                                                    )
                                                }{" "}
                                                each
                                            </p>

                                        </div>


                                        <div className="admin-order-item-price">

                                            <strong>
                                                {
                                                    formatPrice(
                                                        item.subtotal
                                                    )
                                                }
                                            </strong>

                                            <span>
                                                Qty:{" "}
                                                {item.quantity}
                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </section>


                            <section className="admin-details-card">

                                <h2>
                                    Delivery Address
                                </h2>

                                {order.deliveryAddress ? (

                                    <div className="admin-delivery-address">

                                        <strong>
                                            {
                                                order
                                                    .deliveryAddress
                                                    .fullName
                                            }
                                        </strong>

                                        <p>
                                            {
                                                order
                                                    .deliveryAddress
                                                    .addressLine1
                                            }
                                        </p>

                                        {order.deliveryAddress
                                            .addressLine2 && (

                                            <p>
                                                {
                                                    order
                                                        .deliveryAddress
                                                        .addressLine2
                                                }
                                            </p>

                                        )}

                                        <p>

                                            {
                                                order
                                                    .deliveryAddress
                                                    .city
                                            },

                                            {" "}

                                            {
                                                order
                                                    .deliveryAddress
                                                    .state
                                            }

                                            {" - "}

                                            {
                                                order
                                                    .deliveryAddress
                                                    .postalCode
                                            }

                                        </p>

                                        <p>
                                            {
                                                order
                                                    .deliveryAddress
                                                    .country
                                            }
                                        </p>

                                        <p>
                                            Phone:{" "}
                                            {
                                                order
                                                    .deliveryAddress
                                                    .phone
                                            }
                                        </p>

                                    </div>

                                ) : (

                                    <p>
                                        No delivery address available.
                                    </p>

                                )}

                            </section>

                        </div>


                        <div className="admin-order-side-column">


                            <section className="admin-details-card">

                                <h2>
                                    Order Summary
                                </h2>


                                <div className="admin-summary-row">

                                    <span>
                                        Order ID
                                    </span>

                                    <strong>
                                        #{order.id}
                                    </strong>

                                </div>


                                <div className="admin-summary-row">

                                    <span>
                                        Order Number
                                    </span>

                                    <strong>
                                        {order.orderNumber}
                                    </strong>

                                </div>


                                <div className="admin-summary-row">

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


                                <div className="admin-summary-row">

                                    <span>
                                        Payment
                                    </span>

                                    <strong>
                                        {
                                            order.paymentMethod
                                        }
                                    </strong>

                                </div>


                                <div className="admin-summary-row">

                                    <span>
                                        Payment Status
                                    </span>

                                    <strong>
                                        {
                                            order.paymentStatus
                                        }
                                    </strong>

                                </div>


                                <div className="admin-summary-row">

                                    <span>
                                        Status
                                    </span>

                                    <strong>
                                        {order.status}
                                    </strong>

                                </div>


                                <div className="admin-summary-total">

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

                            </section>


                            <section className="admin-details-card">

                                <h2>
                                    Update Order Status
                                </h2>


                                {allowedStatuses.length > 0 ? (

                                    <>

                                        <label
                                            className="admin-status-label"
                                        >
                                            Change status
                                        </label>

                                        <select
                                            className="admin-status-select"

                                            value={
                                                selectedStatus
                                            }

                                            onChange={
                                                (e) =>
                                                    setSelectedStatus(
                                                        e.target.value
                                                    )
                                            }
                                        >

                                            <option
                                                value={
                                                    order.status
                                                }
                                            >
                                                {
                                                    order.status
                                                }{" "}
                                                (Current)
                                            </option>


                                            {allowedStatuses.map(
                                                (status) => (

                                                <option
                                                    value={status}
                                                    key={status}
                                                >
                                                    {status}
                                                </option>

                                            ))}

                                        </select>


                                        <button
                                            type="button"

                                            className="admin-update-status-button"

                                            onClick={
                                                handleStatusUpdate
                                            }

                                            disabled={
                                                updating ||
                                                selectedStatus ===
                                                order.status
                                            }
                                        >

                                            {
                                                updating
                                                    ? "Updating..."
                                                    : "Update Status"
                                            }

                                        </button>

                                    </>

                                ) : (

                                    <div className="admin-final-status">

                                        This order is{" "}

                                        <strong>
                                            {order.status}
                                        </strong>

                                        {" "}and cannot be changed.

                                    </div>

                                )}

                            </section>

                        </div>

                    </div>

                </div>

            </main>

        </>

    );
}


export default AdminOrderDetails;