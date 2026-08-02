import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
    addAddress,
    getAddressById,
    updateAddress
} from "../services/api";

function AddressForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        addressType: "HOME",
        defaultAddress: false,
    });

    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const loadAddress = async () => {
            try {
                setLoading(true);
                setError("");

                // Load all saved addresses and find the selected address.
                // This works with the existing Saved Addresses backend API.
                const address = await getAddressById(id);

                if (!address) {
                    setError("Address not found.");
                    return;
                }

                setFormData({
                    fullName: address.fullName || "",
                    phone: address.phone || "",
                    addressLine1: address.addressLine1 || "",
                    addressLine2: address.addressLine2 || "",
                    city: address.city || "",
                    state: address.state || "",
                    postalCode: address.postalCode || "",
                    country: address.country || "India",
                    addressType: address.addressType || "HOME",
                    defaultAddress:
                        address.defaultAddress ??
                        address.isDefault ??
                        false,
                });
            } catch (err) {
                console.error("Failed to load address:", err);
                setError(
                    err.response?.data?.message ||
                    "Unable to load the address."
                );
            } finally {
                setLoading(false);
            }
        };

        loadAddress();
    }, [id, isEditMode]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            if (isEditMode) {

    await updateAddress(
        id,
        formData
    );

} else {

    await addAddress(
        formData
    );
}

            navigate("/profile/addresses");
        } catch (err) {
            console.error("Failed to save address:", err);

            setError(
                err.response?.data?.message ||
                `Unable to ${isEditMode ? "update" : "save"} address.`
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="addresses-page">
                <div className="addresses-header">
                    <div>
                        <h1>
                            {isEditMode
                                ? "Edit Address"
                                : "Add New Address"}
                        </h1>

                        <p>
                            {isEditMode
                                ? "Update your delivery address"
                                : "Add a new delivery address"}
                        </p>
                    </div>

                    <Link
                        to="/profile/addresses"
                        className="profile-home-link"
                    >
                        ← Back to Saved Addresses
                    </Link>
                </div>

                {loading ? (
                    <p>Loading address...</p>
                ) : (
                    <form
                        className="address-form"
                        onSubmit={handleSubmit}
                    >
                        {error && (
                            <div className="form-error">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Address Line 1</label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Address Line 2</label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Pincode</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Address Type</label>

                            <select
                                name="addressType"
                                value={formData.addressType}
                                onChange={handleChange}
                            >
                                <option value="HOME">Home</option>
                                <option value="WORK">Work</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="defaultAddress"
                                    checked={formData.defaultAddress}
                                    onChange={handleChange}
                                />

                                {" "}Set as default address
                            </label>
                        </div>

                        <div className="address-form-actions">
                            <button
                                type="submit"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : isEditMode
                                    ? "Update Address"
                                    : "Save Address"}
                            </button>

                            <Link to="/profile/addresses">
                                Cancel
                            </Link>
                        </div>
                    </form>
                )}
            </main>
        </>
    );
}

export default AddressForm;