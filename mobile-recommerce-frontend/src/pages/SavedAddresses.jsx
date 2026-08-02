import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    getMyAddresses,
    deleteAddress
} from "../services/api";


function SavedAddresses() {

    const [addresses, setAddresses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const navigate =
        useNavigate();


    // ==========================================
    // LOAD ADDRESSES
    // ==========================================

    useEffect(() => {

        loadAddresses();

    }, []);


    async function loadAddresses() {

        try {

            setLoading(true);

            setError("");

            const data =
                await getMyAddresses();

            setAddresses(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to load saved addresses."
            );

        } finally {

            setLoading(false);
        }
    }


    // ==========================================
    // DELETE ADDRESS
    // ==========================================

    async function handleDelete(id) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this address?"
            );

        if (!confirmed) {

            return;
        }

        try {

            setError("");

            await deleteAddress(id);

            await loadAddresses();

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to delete address."
            );
        }
    }


    return (

        <>

            <Navbar />


            <main className="addresses-page">


                {/* =========================
                    PAGE HEADER
                ========================== */}

                <div className="addresses-header">

                    <div>

                        <h1>
                            Saved Addresses
                        </h1>

                        <p>
                            Manage your delivery addresses
                        </p>

                    </div>


                    <Link
                        to="/profile"
                        className="profile-home-link"
                    >
                        ← Back to My Account
                    </Link>

                </div>


                {/* =========================
                    ADD NEW ADDRESS
                ========================== */}

                <div className="addresses-actions">

                    <Link
                        to="/profile/addresses/new"
                        className="address-add-button"
                    >
                        + Add New Address
                    </Link>

                </div>


                {/* =========================
                    ERROR MESSAGE
                ========================== */}

                {error && (

                    <div className="profile-error">

                        {error}

                    </div>

                )}


                {/* =========================
                    LOADING
                ========================== */}

                {loading ? (

                    <p>
                        Loading addresses...
                    </p>

                ) : addresses.length === 0 ? (


                    /* =========================
                        EMPTY ADDRESS LIST
                    ========================== */

                    <div className="address-empty">

                        <h2>
                            No saved addresses
                        </h2>

                        <p>
                            Add an address to use
                            during checkout.
                        </p>

                    </div>

                ) : (


                    /* =========================
                        ADDRESS LIST
                    ========================== */

                    <div className="address-grid">


                        {addresses.map(
                            (address) => (

                                <div
                                    className="address-card"
                                    key={address.id}
                                >


                                    {/* LEFT SIDE
                                        NAME + BADGES
                                    */}

                                    <div className="address-card-header">

                                        <h3>
                                            {address.fullName}
                                        </h3>


                                        <div className="address-badges">

                                            {address.addressType && (

                                                <span className="address-badge">

                                                    {
                                                        address.addressType
                                                    }

                                                </span>

                                            )}


                                            {address.defaultAddress && (

                                                <span className="address-default-badge">

                                                    Default

                                                </span>

                                            )}

                                        </div>

                                    </div>


                                    {/* MIDDLE
                                        ADDRESS DETAILS
                                    */}

                                    <div className="address-details">

                                        <p>
                                            {address.addressLine1}
                                        </p>


                                        {address.addressLine2 && (

                                            <p>
                                                {
                                                    address.addressLine2
                                                }
                                            </p>

                                        )}


                                        <p>

                                            {address.city},
                                            {" "}
                                            {address.state}
                                            {" - "}
                                            {address.postalCode}

                                        </p>


                                        <p>
                                            {address.country}
                                        </p>


                                        <p>
                                            Phone: {address.phone}
                                        </p>

                                    </div>


                                    {/* RIGHT SIDE
                                        EDIT + DELETE
                                    */}

                                    <div className="address-card-actions">


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
                                            onClick={() =>
                                                handleDelete(
                                                    address.id
                                                )
                                            }
                                        >

                                            Delete

                                        </button>


                                    </div>


                                </div>

                            )
                        )}


                    </div>

                )}


            </main>

        </>

    );
}


export default SavedAddresses;