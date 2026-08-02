import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    getCart,
    updateCartItem,
    removeCartItem,
    clearBackendCart
} from "../services/api";


function Cart() {

    const BACKEND_URL =
        "http://localhost:8080";

    const [cart, setCart] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const navigate = useNavigate();


    // ==========================================
    // IMAGE URL
    // ==========================================

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


    // ==========================================
    // LOAD BACKEND CART
    // ==========================================

    async function loadCart() {

        try {

            setError("");

            const data =
                await getCart();

            setCart(data);

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to load cart."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {

        loadCart();

    }, []);


    // ==========================================
    // UPDATE NAVBAR CART COUNT
    // ==========================================

    function notifyCartUpdated() {

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    }


    // ==========================================
    // INCREASE QUANTITY
    // ==========================================

    async function increaseQuantity(item) {

        if (
            item.quantity >=
            item.availableStock
        ) {
            return;
        }

        try {

            const updatedCart =
                await updateCartItem(
                    item.id,
                    item.quantity + 1
                );

            setCart(updatedCart);

            notifyCartUpdated();

        } catch (error) {

            alert(error.message);
        }
    }


    // ==========================================
    // DECREASE QUANTITY
    // ==========================================

    async function decreaseQuantity(item) {

        if (item.quantity <= 1) {
            return;
        }

        try {

            const updatedCart =
                await updateCartItem(
                    item.id,
                    item.quantity - 1
                );

            setCart(updatedCart);

            notifyCartUpdated();

        } catch (error) {

            alert(error.message);
        }
    }


    // ==========================================
    // REMOVE ONE ITEM
    // ==========================================

    async function removeItem(
        cartItemId
    ) {

        try {

            const updatedCart =
                await removeCartItem(
                    cartItemId
                );

            setCart(updatedCart);

            notifyCartUpdated();

        } catch (error) {

            alert(error.message);
        }
    }


    // ==========================================
    // CLEAR ENTIRE CART
    // ==========================================

    async function clearCart() {

        const confirmed =
            window.confirm(
                "Remove all items from your cart?"
            );

        if (!confirmed) {
            return;
        }

        try {

            const updatedCart =
                await clearBackendCart();

            setCart(updatedCart);

            notifyCartUpdated();

        } catch (error) {

            alert(error.message);
        }
    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <>
                <Navbar />

                <main className="empty-cart">

                    <p>
                        Loading cart...
                    </p>

                </main>
            </>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (
            <>
                <Navbar />

                <main className="empty-cart">

                    <h2>
                        Unable to load cart
                    </h2>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/"
                        className="continue-shopping"
                    >
                        Continue Shopping
                    </Link>

                </main>
            </>
        );
    }


    const items =
        cart?.items || [];


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (items.length === 0) {

        return (
            <>
                <Navbar />

                <main className="empty-cart">

                    <div className="empty-cart-icon">
                        🛒
                    </div>

                    <h1>
                        Your cart is empty
                    </h1>

                    <p>
                        Looks like you haven't added
                        any mobiles to your cart yet.
                    </p>

                    <Link
                        to="/"
                        className="continue-shopping"
                    >
                        Continue Shopping
                    </Link>

                </main>
            </>
        );
    }


    return (
        <>
            <Navbar />

            <main className="cart-page">

                <div className="cart-title">

                    <div>

                        <h1>
                            Shopping Cart
                        </h1>

                        <p>
                            {cart.totalItems} item
                            {cart.totalItems !== 1
                                ? "s"
                                : ""}{" "}
                            in your cart
                        </p>

                    </div>


                    <button
                        className="clear-cart-button"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>

                </div>


                <div className="cart-layout">

                    <section className="cart-items">

                        {items.map((item) => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >

                                <div className="cart-item-image">

                                    {item.imageUrl ? (

                                        <img
                                            src={getImageUrl(
                                                item.imageUrl
                                            )}
                                            alt={item.title}
                                        />

                                    ) : (

                                        <span>
                                            📱
                                        </span>

                                    )}

                                </div>


                                <div className="cart-item-details">

                                    <Link
                                        to={
                                            `/products/${item.productId}`
                                        }
                                    >

                                        <h3>
                                            {item.title}
                                        </h3>

                                    </Link>


                                    <p>
                                        {item.color}
                                    </p>


                                    <p className="cart-condition">

                                        {item.conditionType}

                                    </p>


                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            removeItem(
                                                item.id
                                            )
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>


                                <div className="cart-item-actions">

                                    <strong className="cart-item-price">

                                        ₹
                                        {Number(
                                            item.unitPrice
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </strong>


                                    <div className="quantity-control">

                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item
                                                )
                                            }
                                            disabled={
                                                item.quantity <= 1
                                            }
                                        >
                                            −
                                        </button>


                                        <span>
                                            {item.quantity}
                                        </span>


                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item
                                                )
                                            }
                                            disabled={
                                                item.quantity >=
                                                item.availableStock
                                            }
                                        >
                                            +
                                        </button>

                                    </div>


                                    <p className="item-subtotal">

                                        Subtotal: ₹
                                        {Number(
                                            item.subtotal
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </p>

                                </div>

                            </div>

                        ))}

                    </section>


                    <aside className="order-summary">

                        <h2>
                            Order Summary
                        </h2>


                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    cart.totalAmount
                                ).toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Delivery
                            </span>

                            <strong className="free-delivery">
                                FREE
                            </strong>

                        </div>


                        <hr />


                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    cart.totalAmount
                                ).toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        <p className="tax-note">
                            Inclusive of all taxes
                        </p>


                        <button
                             className="checkout-button"
                             onClick={() => navigate("/checkout")}
                        >
                             Proceed to Checkout
                        </button>


                        <Link
                            to="/"
                            className="cart-continue-link"
                        >
                            ← Continue Shopping
                        </Link>

                    </aside>

                </div>

            </main>
        </>
    );
}

export default Cart;