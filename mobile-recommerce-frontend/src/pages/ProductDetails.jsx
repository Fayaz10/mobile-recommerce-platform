 import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    getProductById,
    addProductToCart
} from "../services/api";

import LoginModel from "../components/auth/LoginModel";
import Navbar from "../components/Navbar";

function ProductDetails() {

    const { id } = useParams();

    const [showLoginModel, setShowLoginModel] = useState(false);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const BACKEND_URL = "http://localhost:8080";

    const getImageUrl = (imageUrl) => {

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
    };


    useEffect(() => {

        getProductById(id)
            .then(setProduct)
            .catch((error) => {

                console.error(error);

                setError(
                    "Unable to load product."
                );
            })
            .finally(() => {

                setLoading(false);
            });

    }, [id]);


    async function addToCart() {

        const token =
            localStorage.getItem("token");

        if (!token) {

           setShowLoginModel(true);

           return;
        }

        try {

            const updatedCart =
                await addProductToCart(
                    product.id,
                    1
                );

            window.dispatchEvent(
                new Event("cartUpdated")
            );

            console.log(
                "Backend cart:",
                updatedCart
            );

            alert(
                product.title +
                " added to cart successfully."
            );

        } catch (error) {

            console.error(
                "Add to cart error:",
                error
            );

            alert(
                error.message ||
                "Unable to add product to cart."
            );
        }
    }


    if (loading) {

        return (
            <>
                <Navbar />

                <div className="page-message">
                    Loading product...
                </div>
            </>
        );
    }


    if (error || !product) {

        return (
            <>
                <Navbar />

                <div className="page-message">

                    <h2>
                        Product not available
                    </h2>

                    <Link to="/">
                        Back to Home
                    </Link>

                </div>
            </>
        );
    }


    const model =
        product.deviceVariant?.deviceModel;

    const brand =
        model?.brand;


    return (

        <>
            <Navbar />

            <main className="product-details-page">

                <div className="breadcrumb">

                    <Link to="/">
                        Home
                    </Link>

                    <span>›</span>

                    <span>
                        {brand?.name}
                    </span>

                    <span>›</span>

                    <span>
                        {product.title}
                    </span>

                </div>


                <div className="product-details-container">

                    <div className="details-image-section">

                        <div className="details-image">

                            {product.imageUrl ? (

                                <img
                                    src={getImageUrl(
                                        product.imageUrl
                                    )}
                                    alt={product.title}
                                />

                            ) : (

                                <span>
                                    📱
                                </span>

                            )}

                        </div>

                    </div>


                    <div className="details-content">

                        <p className="details-brand">

                            {brand?.name ||
                                "Smartphone"}

                        </p>


                        <h1>
                            {product.title}
                        </h1>


                        <div className="details-condition">

                            ✓ {product.conditionType}

                        </div>


                        <div className="details-price">

                            <strong>

                                ₹{Number(
                                    product.sellingPrice
                                ).toLocaleString(
                                    "en-IN"
                                )}

                            </strong>

                            <del>

                                ₹{Number(
                                    product.originalPrice
                                ).toLocaleString(
                                    "en-IN"
                                )}

                            </del>

                        </div>


                        <p className="tax-text">
                            Inclusive of all taxes
                        </p>

                        <hr />


                        <div className="specification-grid">

                            <div>

                                <span>
                                    Model
                                </span>

                                <strong>
                                    {model?.name ||
                                        "N/A"}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    RAM
                                </span>

                                <strong>

                                    {product
                                        .deviceVariant
                                        ?.ram ||
                                        "N/A"}

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Storage
                                </span>

                                <strong>

                                    {product
                                        .deviceVariant
                                        ?.storage ||
                                        "N/A"}

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Color
                                </span>

                                <strong>
                                    {product.color}
                                </strong>

                            </div>

                        </div>


                        <div className="warranty-box">

                            <strong>
                                ✓ Warranty
                            </strong>

                            <span>
                                {product.warranty}
                            </span>

                        </div>


                        <div className="stock-info">

                            {product.stockQuantity > 0

                                ? `${product.stockQuantity} units available`

                                : "Currently out of stock"}

                        </div>


                        <button
                            className="add-cart-button"
                            disabled={
                                product.stockQuantity <= 0
                            }
                            onClick={addToCart}
                        >

                            {product.stockQuantity > 0
                                ? "Add to Cart"
                                : "Out of Stock"}

                        </button>


                        {product.description && (

                            <div className="description">

                                <h3>
                                    About this product
                                </h3>

                                <p>
                                    {product.description}
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </main>

            {showLoginModel && (

                   <LoginModel

                  onClose={() =>
                    setShowLoginModel(false)
                        }

                  onSuccess={() => {

                    setShowLoginModel(false);

                    addToCart();

                  }}

           />

          )}

        </>
    );
}

export default ProductDetails;