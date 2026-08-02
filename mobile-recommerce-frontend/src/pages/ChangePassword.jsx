import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { changePassword } from "../services/api";

function ChangePassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);


    function handleChange(event) {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    }


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setMessage("");

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {
            setError(
                "New password and confirm password do not match."
            );

            return;
        }

        try {

            setSaving(true);

            await changePassword({
                currentPassword:
                    formData.currentPassword,

                newPassword:
                    formData.newPassword,
               
                confirmPassword:
                    formData.confirmPassword
                    
            });

            setMessage(
                "Password changed successfully."
            );

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

            // Return to profile after success
            setTimeout(() => {
                navigate("/profile");
            }, 1200);

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to change password."
            );

        } finally {

            setSaving(false);
        }
    }


    return (
        <>
            <Navbar />

            <main className="profile-page">

                <div className="profile-header">

                    <div>
                        <h1>
                            Change Password
                        </h1>

                        <p>
                            Update your account password
                        </p>
                    </div>

                    <Link
                        to="/profile"
                        className="profile-home-link"
                    >
                        ← Back to My Account
                    </Link>

                </div>


                <div className="password-page-container">

                    <section className="profile-card">

                        <div className="profile-card-header">

                            <h2>
                                Password
                            </h2>

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


                        <form
                            className="profile-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="profile-form-group">

                                <label>
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={
                                        formData.currentPassword
                                    }
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                />

                            </div>


                            <div className="profile-form-group">

                                <label>
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    name="newPassword"
                                    value={
                                        formData.newPassword
                                    }
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />

                            </div>


                            <div className="profile-form-group">

                                <label>
                                    Confirm New Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />

                            </div>


                            <div className="profile-form-actions">

                                <button
                                    type="button"
                                    className="profile-cancel-button"
                                    onClick={() =>
                                        navigate("/profile")
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="profile-save-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Changing..."
                                        : "Change Password"}
                                </button>

                            </div>

                        </form>

                    </section>

                </div>

            </main>
        </>
    );
}

export default ChangePassword;