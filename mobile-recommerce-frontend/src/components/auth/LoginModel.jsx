import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/api";

function LoginModel({ onClose, onSuccess }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        try {

            setLoading(true);

            const data = await loginUser({
                email,
                password
            });

            localStorage.setItem(
                "user",
                JSON.stringify({
                    userId: data.userId,
                    name: data.name,
                    email: data.email,
                    role: data.role
                })
            );

            localStorage.setItem(
                "token",
                data.token
            );

            window.dispatchEvent(
                new Event("userUpdated")
            );

            onSuccess();

        } catch (error) {

            setError(
                error.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div
            className="login-model-overlay"
            onClick={onClose}
        >

            <div
                className="login-model"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className="model-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="login-model-icon">

                    🔒

                </div>

                <h2>

                    Login Required

                </h2>

                <p>

                    Please login to continue.
                    You need an account to add
                    products to your cart.

                </p>

                {error && (

                    <div className="model-error">

                        {error}

                    </div>

                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        className="login-btn"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>

                <p className="register-link">

                    New user?

                    <Link to="/register">

                        Create Account

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default LoginModel;