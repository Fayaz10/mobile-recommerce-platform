import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";


import Navbar from "../components/Navbar";

import {
    loginUser
} from "../services/api";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        try {

            setLoading(true);

            const data =
                await loginUser({
                    email,
                    password
                });


            const loggedInUser = {

                userId: data.userId,

                name: data.name,

                email: data.email,

                role: data.role

            };


            localStorage.setItem(
                "user",
                JSON.stringify(
                    loggedInUser
                )
            );


            localStorage.setItem(
                "token",
                data.token
            );


            window.dispatchEvent(
                new Event(
                    "userUpdated"
                )
            );


            navigate("/");

        } catch (error) {

            setError(
                error.message ||
                "Unable to login. Please check your credentials."
            );

        } finally {

            setLoading(false);

        }

    }


    return (

        <>

            <Navbar />


            <main className="login-page">


                {/* LEFT SIDE */}

                <section className="login-showcase">

                    <div className="login-showcase-content">

                        <span className="login-badge">
                            🔧 AMBATTUR'S MOBILE REPAIR EXPERTS
                        </span>


                        <h1>

                            Your Mobile.

                            <br />

                            <span>
                                Our Expertise.
                            </span>

                        </h1>


                        <p className="login-showcase-text">

                            Sign in to book professional
                            mobile repairs, track your repair
                            status and shop certified
                            refurbished mobiles.

                        </p>


                        <div className="login-benefits">

                            <div className="login-benefit">

                                <span>✓</span>

                                <div>

                                    <strong>
                                        Track Your Repair
                                    </strong>

                                    <small>
                                        Follow your repair status easily
                                    </small>

                                </div>

                            </div>


                            <div className="login-benefit">

                                <span>✓</span>

                                <div>

                                    <strong>
                                        Repair Video Proof
                                    </strong>

                                    <small>
                                        Transparent service you can trust
                                    </small>

                                </div>

                            </div>


                            <div className="login-benefit">

                                <span>✓</span>

                                <div>

                                    <strong>
                                        Quality Parts
                                    </strong>

                                    <small>
                                        Reliable parts and expert service
                                    </small>

                                </div>

                            </div>

                        </div>


                        <div className="login-shop-note">

                            📍 In-shop repair only — visit
                            Ambattur Mobiles for professional
                            service.

                        </div>

                    </div>

                </section>



                {/* RIGHT SIDE */}

                <section className="login-form-section">

                    <div className="auth-card">


                        <div className="auth-icon">

                            <span>👤</span>

                        </div>


                        <div className="auth-heading">

                            <p>
                                WELCOME BACK
                            </p>

                            <h2>
                                Login to Your Account
                            </h2>

                            <span>

                                Access your repairs,
                                orders and account details.

                            </span>

                        </div>


                        {error && (

                            <div className="auth-error">

                                <span>!</span>

                                {error}

                            </div>

                        )}



                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="auth-form"
                        >


                            <div className="auth-field">

                                <label htmlFor="login-email">

                                    Email Address

                                </label>


                                <div className="auth-input-wrapper">

                                    <span className="auth-input-icon">
                                        ✉
                                    </span>


                                    <input
                                        id="login-email"
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter your email address"
                                        autoComplete="email"
                                        required
                                    />

                                </div>

                            </div>



                            <div className="auth-field">

                                <div className="auth-password-label">

                                    <label htmlFor="login-password">

                                        Password

                                    </label>

                                </div>


                                <div className="auth-input-wrapper">

                                    <span className="auth-input-icon">
                                        🔒
                                    </span>


                                    <input
                                        id="login-password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                    />


                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {showPassword
                                            ? "Hide"
                                            : "Show"}

                                    </button>

                                </div>

                            </div>



                            <button
                                type="submit"
                                className="auth-submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Logging in..."
                                    : "Login to Account →"}

                            </button>

                        </form>



                        <div className="auth-divider">

                            <span>
                                New to Ambattur Mobiles?
                            </span>

                        </div>



                        <Link
                            to="/register"
                            className="create-account-button"
                        >

                            Create New Account

                        </Link>



                        <p className="auth-security">

                            🔒 Your account information
                            is securely protected.

                        </p>

                    </div>

                </section>


            </main>

        </>

    );

}


export default Login;