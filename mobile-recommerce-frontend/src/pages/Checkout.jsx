import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    getCart,
    getMyAddresses,
    addAddress,
    deleteAddress,
    checkoutCart
} from "../services/api";


function Checkout() {

    const navigate = useNavigate();

    const [cart, setCart] = useState(null);

    const [addresses, setAddresses] =
        useState([]);

    const [selectedAddressId,
        setSelectedAddressId] =
        useState("");

    const [paymentMethod,
        setPaymentMethod] =
        useState("COD");

    const [showAddressForm,
        setShowAddressForm] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [placingOrder,
        setPlacingOrder] =
        useState(false);

    const [error, setError] =
        useState("");


    // ==========================================
    // NEW ADDRESS FORM
    // ==========================================

    const [addressForm, setAddressForm] =
        useState({

            addressType: "HOME",

            fullName: "",

            phone: "",

            addressLine1: "",

            addressLine2: "",

            city: "",

            state: "",

            postalCode: "",

            country: "India",

            defaultAddress: false
        });


    // ==========================================
    // LOAD CART + ADDRESSES
    // ==========================================

    useEffect(() => {

        async function loadCheckout() {

            try {

                setLoading(true);

                setError("");

                const [
                    cartData,
                    addressData
                ] = await Promise.all([

                    getCart(),

                    getMyAddresses()
                ]);


                setCart(cartData);

                setAddresses(addressData);


                // Select default address first

                const defaultAddress =
                    addressData.find(
                        (address) =>
                            address.defaultAddress === true
                    );


                if (defaultAddress) {

                    setSelectedAddressId(
                        String(defaultAddress.id)
                    );

                } else if (
                    addressData.length > 0
                ) {

                    setSelectedAddressId(
                        String(addressData[0].id)
                    );
                }


                // If no saved address,
                // automatically show form

                if (
                    addressData.length === 0
                ) {

                    setShowAddressForm(true);
                }

            } catch (err) {

                console.error(err);

                setError(
                    err.message ||
                    "Unable to load checkout."
                );

            } finally {

                setLoading(false);
            }
        }


        loadCheckout();

    }, []);


    // ==========================================
    // HANDLE ADDRESS INPUT
    // ==========================================

    function handleAddressChange(event) {

        const {
            name,
            value,
            type,
            checked
        } = event.target;


        setAddressForm((previous) => ({

            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    }


    // ==========================================
    // SAVE NEW ADDRESS
    // ==========================================

    async function handleAddAddress(event) {

        event.preventDefault();

        try {

            setError("");

            const savedAddress =
                await addAddress(
                    addressForm
                );


            setAddresses(
                (previous) => [
                    ...previous,
                    savedAddress
                ]
            );


            setSelectedAddressId(
                String(savedAddress.id)
            );


            setShowAddressForm(false);


            setAddressForm({

                addressType: "HOME",

                fullName: "",

                phone: "",

                addressLine1: "",

                addressLine2: "",

                city: "",

                state: "",

                postalCode: "",

                country: "India",

                defaultAddress: false
            });

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Unable to save address."
            );
        }
    }

    // ==========================================
// DELETE SAVED ADDRESS
// ==========================================

async function handleDeleteAddress(
    event,
    addressId
) {

    // Prevent clicking Delete from selecting
    // the address radio/card.
    event.preventDefault();
    event.stopPropagation();

    const confirmed = window.confirm(
        "Are you sure you want to delete this address?"
    );

    if (!confirmed) {
        return;
    }

    try {

        setError("");

        await deleteAddress(addressId);

        const updatedAddresses =
            addresses.filter(
                (address) =>
                    address.id !== addressId
            );

        setAddresses(updatedAddresses);

        // If deleted address was selected,
        // select another available address.
        if (
            String(selectedAddressId) ===
            String(addressId)
        ) {

            const defaultAddress =
                updatedAddresses.find(
                    (address) =>
                        address.defaultAddress === true
                );

            if (defaultAddress) {

                setSelectedAddressId(
                    String(defaultAddress.id)
                );

            } else if (
                updatedAddresses.length > 0
            ) {

                setSelectedAddressId(
                    String(
                        updatedAddresses[0].id
                    )
                );

            } else {

                setSelectedAddressId("");

                setShowAddressForm(true);
            }
        }

    } catch (err) {

        console.error(err);

        setError(
            err.message ||
            "Unable to delete address."
        );
    }
}


    // ==========================================
    // PLACE ORDER
    // ==========================================

    async function handlePlaceOrder() {

        if (!selectedAddressId) {

            setError(
                "Please select a delivery address."
            );

            return;
        }


        if (
            !cart ||
            !cart.items ||
            cart.items.length === 0
        ) {

            setError(
                "Your cart is empty."
            );

            return;
        }


        try {

            setPlacingOrder(true);

            setError("");


            const order =
                await checkoutCart(

                    selectedAddressId,

                    paymentMethod
                );


            // Remove old frontend cart,
            // if any remains

            localStorage.removeItem(
                "cart"
            );


            // Refresh Navbar count

            window.dispatchEvent(
                new Event("cartUpdated")
            );


            // Go to order success page
            // We will create this next

            navigate(
                `/order-success/${order.id}`,
                {
                    state: {
                        order
                    }
                }
            );

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Unable to place order."
            );

        } finally {

            setPlacingOrder(false);
        }
    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="page-message">

                    Loading checkout...

                </div>

            </>
        );
    }


    // ==========================================
    // LOAD ERROR
    // ==========================================

    if (!cart) {

        return (

            <>

                <Navbar />

                <div className="page-message">

                    <h2>
                        Unable to load checkout
                    </h2>

                    <p>
                        {error}
                    </p>

                    <Link to="/cart">

                        Back to Cart

                    </Link>

                </div>

            </>
        );
    }


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (
        !cart.items ||
        cart.items.length === 0
    ) {

        return (

            <>

                <Navbar />

                <div className="page-message">

                    <h2>
                        Your cart is empty
                    </h2>

                    <Link to="/">

                        Continue Shopping

                    </Link>

                </div>

            </>
        );
    }


    return (

        <>

            <Navbar />


            <main className="checkout-page">


                <div className="checkout-header">

                    <h1>
                        Checkout
                    </h1>

                    <Link to="/cart">

                        ← Back to Cart

                    </Link>

                </div>


                {error && (

                    <div className="checkout-error">

                        {error}

                    </div>

                )}


                <div className="checkout-layout">


                    {/* ========================= */}
                    {/* LEFT SIDE */}
                    {/* ========================= */}

                    <div className="checkout-main">


                        {/* DELIVERY ADDRESS */}

                        <section className="checkout-section">

                            <div className="section-heading">

                                <h2>
                                    Delivery Address
                                </h2>

                                {!showAddressForm && (

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowAddressForm(
                                                true
                                            )
                                        }
                                    >

                                        + Add New Address

                                    </button>

                                )}

                            </div>


                            {addresses.length > 0 && (

                            <div className="address-list">

                               {addresses.map((address) => (

    <div
        key={address.id}
        className={
            `checkout-address-row ${
                String(selectedAddressId) ===
                String(address.id)
                    ? "selected"
                    : ""
            }`
        }
        onClick={() =>
            setSelectedAddressId(
                String(address.id)
            )
        }
    >

        {/* RADIO */}

        <div className="checkout-address-select">

            <input
                type="radio"
                name="deliveryAddress"
                value={address.id}
                checked={
                    String(selectedAddressId) ===
                    String(address.id)
                }
                onChange={(event) =>
                    setSelectedAddressId(
                        event.target.value
                    )
                }
            />

        </div>


        {/* NAME + BADGES */}

        <div className="checkout-address-name">

            <h3>
                {address.fullName}
            </h3>

            <div className="address-badges">

                {address.addressType && (

                    <span className="address-badge">
                        {address.addressType}
                    </span>

                )}

                {address.defaultAddress && (

                    <span className="address-default-badge">
                        Default
                    </span>

                )}

            </div>

        </div>


        {/* ADDRESS DETAILS */}

        <div className="checkout-address-details">

            <p>
                {address.addressLine1}
            </p>

            {address.addressLine2 && (

                <p>
                    {address.addressLine2}
                </p>

            )}

            <p>
                {address.city},{" "}
                {address.state} -{" "}
                {address.postalCode}
            </p>

            <p>
                {address.country}
            </p>

            <p>
                Phone: {address.phone}
            </p>

        </div>


        {/* EDIT + DELETE */}

        <div
            className="checkout-address-actions"
            onClick={(event) =>
                event.stopPropagation()
            }
        >

            <button
                type="button"
                className="address-edit-button"
                onClick={() =>
                    navigate(
                        `/profile/addresses/${address.id}/edit`
                    )
                }
            >
                Edit
            </button>

            <button
                type="button"
                className="address-delete-button"
                onClick={(event) =>
                    handleDeleteAddress(
                        event,
                        address.id)
                }
            >
                Delete
            </button>

        </div>

    </div>

))}

    </div>

)}


                            {/* ADD ADDRESS FORM */}

                            {showAddressForm && (

                                <form
                                    className="address-form"

                                    onSubmit={
                                        handleAddAddress
                                    }
                                >

                                    <h3>
                                        Add New Address
                                    </h3>


                                    <div className="form-grid">


                                        <div>

                                            <label>
                                                Address Type
                                            </label>

                                            <select
                                                name="addressType"

                                                value={
                                                    addressForm.addressType
                                                }

                                                onChange={
                                                    handleAddressChange
                                                }
                                            >

                                                <option value="HOME">
                                                    Home
                                                </option>

                                                <option value="WORK">
                                                    Work
                                                </option>

                                                <option value="OTHER">
                                                    Other
                                                </option>

                                            </select>

                                        </div>


                                        <div>

                                            <label>
                                                Full Name
                                            </label>

                                            <input
                                                type="text"

                                                name="fullName"

                                                value={
                                                    addressForm.fullName
                                                }

                                                onChange={
                                                    handleAddressChange
                                                }

                                                required
                                            />

                                        </div>


                                        <div>

                                            <label>
                                                Phone
                                            </label>

                                            <input
                                                type="tel"

                                                name="phone"

                                                value={
                                                    addressForm.phone
                                                }

                                                onChange={
                                                    handleAddressChange
                                                }

                                                pattern="[6-9][0-9]{9}"

                                                maxLength="10"

                                                placeholder="10-digit mobile number"

                                                required
                                            />

                                        </div>


                                        <div className="full-width">

                                            <label>
                                                Address Line 1
                                            </label>

                                            <input
                                                type="text"

                                                name="addressLine1"

                                                value={
                                                    addressForm.addressLine1
                                                }

                                                onChange={
                                                    handleAddressChange
                                                }

                                                required
                                            />

                                        </div>


                                        <div className="full-width">

                                            <label>
                                                Address Line 2
                                            </label>

                                            <input
                                                type="text"

                                                name="addressLine2"

                                                value={
                                                    addressForm.addressLine2
                                                }

                                                onChange={
                                                    handleAddressChange
                                                }

                                                placeholder="Optional"
                                            />

                                        </div>


                                        <div>

                                            <label>
                                                City
                                            </label>

                                            <input
                                                type="text"

                                                name="city"

                                                value={
                                                    addressForm.city
                                                }

                                                onChange={
                                                    handleAddressChange
                                                }

                                                required
                                            />

                                        </div>


                                        <div>

                                            <label>
                                                State
                                            </label>

                                            <input
                                                type="text"

                                                name="state"

                                                value={
                                                    addressForm.state
                                                }

                                                onChange={
                                                    handleAddressChange
                                                }

                                                required
                                            />

                                        </div>


                                        <div>

                                            <label>
                                                PIN Code
                                            </label>

                                            <input
                                                type="text"

                                                name="postalCode"

                                                value={
                                                    addressForm.postalCode
                                                }

                                                onChange={
                                                    handleAddressChange
                                                }

                                                pattern="[1-9][0-9]{5}"

                                                maxLength="6"

                                                required
                                            />

                                        </div>


                                        <div>

                                            <label>
                                                Country
                                            </label>

                                            <input
                                                type="text"

                                                name="country"

                                                value={
                                                    addressForm.country
                                                }

                                                onChange={
                                                    handleAddressChange
                                                }

                                                required
                                            />

                                        </div>

                                    </div>


                                    <label className="default-address-check">

                                        <input
                                            type="checkbox"

                                            name="defaultAddress"

                                            checked={
                                                addressForm.defaultAddress
                                            }

                                            onChange={
                                                handleAddressChange
                                            }
                                        />

                                        Make this my default address

                                    </label>


                                    <div className="address-form-actions">

                                        <button
                                            type="submit"
                                            className="save-address-button"
                                        >

                                            Save Address

                                        </button>


                                        {addresses.length > 0 && (

                                            <button
                                                type="button"

                                                className="cancel-address-button"

                                                onClick={() =>
                                                    setShowAddressForm(
                                                        false
                                                    )
                                                }
                                            >

                                                Cancel

                                            </button>

                                        )}

                                    </div>

                                </form>

                            )}

                        </section>


                        {/* PAYMENT */}

                        <section className="checkout-section">

                            <h2>
                                Payment Method
                            </h2>


                            <label className="payment-option">

                                <input
                                    type="radio"

                                    name="paymentMethod"

                                    value="COD"

                                    checked={
                                        paymentMethod ===
                                        "COD"
                                    }

                                    onChange={
                                        (event) =>
                                            setPaymentMethod(
                                                event.target.value
                                            )
                                    }
                                />

                                <div>

                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <p>
                                        Pay when your order
                                        is delivered.
                                    </p>

                                </div>

                            </label>


                            <label className="payment-option">

                                <input
                                    type="radio"

                                    name="paymentMethod"

                                    value="ONLINE"

                                    checked={
                                        paymentMethod ===
                                        "ONLINE"
                                    }

                                    onChange={
                                        (event) =>
                                            setPaymentMethod(
                                                event.target.value
                                            )
                                    }
                                />

                                <div>

                                    <strong>
                                        Online Payment
                                    </strong>

                                    <p>
                                        Online payment option.
                                    </p>

                                </div>

                            </label>

                        </section>

                    </div>


                    {/* ========================= */}
                    {/* ORDER SUMMARY */}
                    {/* ========================= */}

                    <aside className="checkout-summary">

                        <h2>
                            Order Summary
                        </h2>


                        {cart.items.map(
                            (item) => (

                                <div
                                    className="checkout-item"
                                    key={item.id}
                                >

                                    <div>

                                        <strong>
                                            {item.title}
                                        </strong>

                                        <p>
                                            Qty: {
                                                item.quantity
                                            }
                                        </p>

                                    </div>


                                    <strong>

                                        ₹{
                                            Number(
                                                item.subtotal
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                        }

                                    </strong>

                                </div>

                            )
                        )}


                        <hr />


                        <div className="summary-row">

                            <span>
                                Items
                            </span>

                            <span>
                                {cart.totalItems}
                            </span>

                        </div>


                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>

                                ₹{
                                    Number(
                                        cart.totalAmount
                                    ).toLocaleString(
                                        "en-IN"
                                    )
                                }

                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Delivery
                            </span>

                            <strong>
                                FREE
                            </strong>

                        </div>


                        <hr />


                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>

                                ₹{
                                    Number(
                                        cart.totalAmount
                                    ).toLocaleString(
                                        "en-IN"
                                    )
                                }

                            </strong>

                        </div>


                        <button
                            className="place-order-button"

                            disabled={
                                placingOrder ||
                                !selectedAddressId
                            }

                            onClick={
                                handlePlaceOrder
                            }
                        >

                            {
                                placingOrder
                                    ? "Placing Order..."
                                    : paymentMethod ===
                                      "COD"
                                        ? "Place Order"
                                        : "Continue to Payment"
                            }

                        </button>

                    </aside>

                </div>

            </main>

        </>

    );
}


export default Checkout;