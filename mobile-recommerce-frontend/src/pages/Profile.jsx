import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
    getProfile,
    updateProfile
} from "../services/api";


function Profile() {

    const [profile, setProfile] =
        useState(null);

    const [formData, setFormData] =
        useState({
            name: "",
            phone: ""
        });

    const [loading, setLoading] =
        useState(true);

    const [editing, setEditing] =
        useState(false);

    const [error, setError] =
        useState("");

    const [message, setMessage] =
        useState("");


    // ==========================================
    // LOAD PROFILE
    // ==========================================

    useEffect(() => {

        loadProfile();

    }, []);


    async function loadProfile() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getProfile();

            setProfile(data);

            setFormData({
                name: data.name || "",
                phone: data.phone || ""
            });

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to load profile"
            );

        } finally {

            setLoading(false);
        }
    }


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    function handleChange(event) {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,

            [name]: value
        }));
    }


    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setError("");
            setMessage("");

            const updatedProfile =
                await updateProfile(
                    formData
                );

            setProfile(
                updatedProfile
            );

            setFormData({
                name:
                    updatedProfile.name || "",

                phone:
                    updatedProfile.phone || ""
            });


            // Update navbar username
            const savedUser =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    )
                ) || {};

            const updatedUser = {
                ...savedUser,

                name:
                    updatedProfile.name
            };

            localStorage.setItem(
                "user",
                JSON.stringify(
                    updatedUser
                )
            );

            window.dispatchEvent(
                new Event(
                    "userUpdated"
                )
            );


            setEditing(false);

            setMessage(
                "Profile updated successfully."
            );

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to update profile"
            );
        }
    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <>
                <Navbar />

                <main className="profile-page">

                    <div className="page-message">

                        Loading profile...

                    </div>

                </main>
            </>
        );
    }


    // ==========================================
    // ERROR / NO PROFILE
    // ==========================================

    if (!profile) {

        return (
            <>
                <Navbar />

                <main className="profile-page">

                    <div className="page-message">

                        <h2>
                            Unable to load profile
                        </h2>

                        <p>
                            {error}
                        </p>

                        <Link to="/">
                            Back to Home
                        </Link>

                    </div>

                </main>
            </>
        );
    }


    return (

        <>
            <Navbar />

            <main className="profile-page">

                <div className="profile-header">

                    <div>

                        <h1>
                            My Account
                        </h1>

                        <p>
                            Manage your account
                            information
                        </p>

                    </div>

                    <Link
                        to="/"
                        className="profile-home-link"
                    >
                        ← Continue Shopping
                    </Link>

                </div>


                {message && (

                    <div className="profile-success">

                        {message}

                    </div>

                )}


                {error && (

                    <div className="profile-error">

                        {error}

                    </div>

                )}


                <div className="profile-layout">


                    {/* LEFT SIDE */}

                    <div className="profile-main">


                        <section className="profile-card">

                            <div className="profile-card-header">

                                <h2>
                                    Personal Information
                                </h2>


                                {!editing && (

                                    <button
                                        type="button"
                                        className="profile-edit-button"
                                        onClick={() =>
                                            setEditing(true)
                                        }
                                    >
                                        Edit Profile
                                    </button>

                                )}

                            </div>


                            {!editing ? (

                                <div className="profile-info-grid">

                                    <div>

                                        <span>
                                            Full Name
                                        </span>

                                        <strong>
                                            {profile.name ||
                                                "Not provided"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Email
                                        </span>

                                        <strong>
                                            {profile.email ||
                                                "Not provided"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Phone
                                        </span>

                                        <strong>
                                            {profile.phone ||
                                                "Not provided"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Role
                                        </span>

                                        <strong>
                                            {profile.role ||
                                                "CUSTOMER"}
                                        </strong>

                                    </div>

                                </div>

                            ) : (

                                <form
                                    className="profile-form"
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

                                    <div className="profile-form-group">

                                        <label>
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={
                                                formData.name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="profile-form-group">

                                        <label>
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            value={
                                                profile.email ||
                                                ""
                                            }
                                            disabled
                                        />

                                        <small>
                                            Email cannot be
                                            changed here.
                                        </small>

                                    </div>


                                    <div className="profile-form-group">

                                        <label>
                                            Phone
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={
                                                formData.phone
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder=
                                                "10-digit mobile number"
                                        />

                                    </div>


                                    <div className="profile-form-actions">

                                        <button
                                            type="button"
                                            className="profile-cancel-button"
                                            onClick={() => {

                                                setEditing(
                                                    false
                                                );

                                                setFormData({
                                                    name:
                                                        profile.name ||
                                                        "",

                                                    phone:
                                                        profile.phone ||
                                                        ""
                                                });

                                                setError("");
                                            }}
                                        >
                                            Cancel
                                        </button>


                                        <button
                                            type="submit"
                                            className="profile-save-button"
                                        >
                                            Save Changes
                                        </button>

                                    </div>

                                </form>

                            )}

                        </section>

                    </div>


                    {/* RIGHT SIDE */}

                    <aside className="profile-sidebar">

                        <h2>
                            Account
                        </h2>


                        <Link
                            to="/orders"
                            className="profile-menu-item"
                        >
                            My Orders
                            <span>›</span>
                        </Link>


                        <Link
                            to="/profile/password"
                            className="profile-menu-item"
                        >
                            Change Password
                            <span>›</span>
                        </Link>


                        <Link
                            to="/profile/addresses"
                            className="profile-menu-item"
                        >
                            Saved Addresses
                            <span>›</span>
                        </Link>

                    </aside>

                </div>

            </main>

        </>

    );
}

export default Profile;