import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { registerUser } from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    function handleChange(event) {

        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (form.password !== confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        if (form.password.length < 8) {

            setError("Password must contain at least 8 characters.");

            return;

        }

        try {

            setLoading(true);

            await registerUser(form);

            alert("Registration successful. Please login.");

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

            <main className="login-page">

                {/* LEFT SIDE */}

                <section className="login-showcase">

                    <div className="login-showcase-content">

                        <span className="login-badge">
                            CREATE ACCOUNT
                        </span>

                        <h1>
                            Join <span>Ambattur Mobiles</span>
                        </h1>

                        <p className="login-showcase-text">

                            Create your account to buy certified refurbished
                            mobiles, book repairs, track orders and enjoy
                            exclusive offers.

                        </p>

                        <div className="login-benefits">

                            <div className="login-benefit">

                                <span>✓</span>

                                <div>

                                    <strong>
                                        Certified Refurbished Mobiles
                                    </strong>

                                    <small>
                                        Quality checked devices
                                    </small>

                                </div>

                            </div>

                            <div className="login-benefit">

                                <span>✓</span>

                                <div>

                                    <strong>
                                        Genuine Spare Parts
                                    </strong>

                                    <small>
                                        Premium quality with warranty
                                    </small>

                                </div>

                            </div>

                            <div className="login-benefit">

                                <span>✓</span>

                                <div>

                                    <strong>
                                        Professional Repair Service
                                    </strong>

                                    <small>
                                        Trusted technicians in Ambattur
                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* RIGHT SIDE */}

                <section className="login-form-section">

                    <div className="auth-card">

                        <div className="auth-icon">
                            👤
                        </div>

                        <div className="auth-heading">

                            <p>WELCOME</p>

                            <h2>Create Account</h2>

                            <span>
                                Create your Ambattur Mobiles customer account.
                            </span>

                        </div>

                        {error && (

                            <div className="auth-error">

                                {error}

                            </div>

                        )}

                        <form
                            className="auth-form"
                            onSubmit={handleSubmit}
                        >

                            <label>

                                <span>Full Name</span>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />

                            </label>

                            <label>

                                <span>Email</span>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />

                            </label>

                            <label>

                                <span>Phone Number</span>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    required
                                />

                            </label>

                            <label>

                                <span>Password</span>

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Minimum 8 characters"
                                    minLength="8"
                                    required
                                />

                            </label>

                            <label>

                               <span> Confirm Password</span>

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    placeholder="Confirm password"
                                    required
                                />

                            </label>

                            <button
                                className="auth-submit"
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}

                            </button>

                        </form>

                        <hr
                           style={{
                                   margin: "28px 0",
                                   border: "none",
                                   borderTop: "1px solid #e8edf4"
                            }}
                        />

                        <p className="auth-switch">

                            Already have an account?

                            {" "}

                            <Link to="/login">

                                Login

                            </Link>

                        </p>

                    </div>

                </section>

            </main>

        </>

    );

}

export default Register;