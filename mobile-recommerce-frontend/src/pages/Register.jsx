import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";
import {
    registerUser
} from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            phone: "",
            password: ""
        });

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    function handleChange(event) {

        const {
            name,
            value
        } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (
            form.password !==
            confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }

        if (form.password.length < 8) {

            setError(
                "Password must contain at least 8 characters."
            );

            return;
        }

        try {

            setLoading(true);

            await registerUser(form);

            alert(
                "Registration successful. Please login."
            );

            navigate("/login");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <main className="auth-page">

                <div className="auth-card">

                    <h1>
                        Create Account
                    </h1>

                    <p className="auth-subtitle">
                        Create your MobileHub
                        customer account
                    </p>

                    {error && (

                        <div className="auth-error">
                            {error}
                        </div>

                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                    >

                        <label>
                            Full Name

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your full name"
                                required
                            />
                        </label>

                        <label>
                            Email

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your email"
                                required
                            />
                        </label>

                        <label>
                            Phone Number

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your phone number"
                                required
                            />
                        </label>

                        <label>
                            Password

                            <input
                                type="password"
                                name="password"
                                value={
                                    form.password
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Minimum 8 characters"
                                minLength="8"
                                required
                            />
                        </label>

                        <label>
                            Confirm Password

                            <input
                                type="password"
                                value={
                                    confirmPassword
                                }
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter password again"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Account"}

                        </button>

                    </form>

                    <p className="auth-switch">

                        Already have an account?

                        {" "}

                        <Link to="/login">
                            Login
                        </Link>

                    </p>

                </div>

            </main>
        </>
    );
}

export default Register;