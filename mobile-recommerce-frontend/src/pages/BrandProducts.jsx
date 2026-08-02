import { useEffect, useState } from "react";
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

import { getProductsByBrand,
         getBrandById
     } from "../services/api";

function BrandProducts() {

    const { brandId } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [brandName, setBrandName] = useState(
    location.state?.brandName || ""
    );


    // ==========================================
    // LOAD PRODUCTS FOR SELECTED BRAND
    // ==========================================
useEffect(() => {

    async function loadBrandPage() {

        try {

            setLoading(true);
            setError("");

            // Get products for selected brand
            const productData =
                await getProductsByBrand(brandId);

            setProducts(
                Array.isArray(productData)
                    ? productData
                    : []
            );

            // Get brand name when page is refreshed
            if (!location.state?.brandName) {

                const brandData =
                    await getBrandById(brandId);

                setBrandName(
                    brandData.name
                );
            }

        } catch (err) {

            console.error(
                "Error loading brand page:",
                err
            );

            setError(
                err.message ||
                "Unable to load brand information"
            );

        } finally {

            setLoading(false);
        }
    }

    loadBrandPage();

}, [brandId, location.state?.brandName]);


    // ==========================================
    // IMAGE URL
    // ==========================================

    function getImageUrl(imageUrl) {

        if (!imageUrl) {
            return "";
        }

        if (imageUrl.startsWith("http")) {
            return imageUrl;
        }

        return `http://localhost:8080${imageUrl}`;
    }


    // ==========================================
    // DISCOUNT
    // ==========================================

    function calculateDiscount(
        originalPrice,
        sellingPrice
    ) {

        const original =
            Number(originalPrice);

        const selling =
            Number(sellingPrice);

        if (
            !original ||
            !selling ||
            original <= 0 ||
            selling >= original
        ) {
            return 0;
        }

        return Math.round(
            ((original - selling) /
                original) *
                100
        );
    }


    // ==========================================
    // PRICE FORMAT
    // ==========================================

    function formatPrice(price) {

        return Number(
            price || 0
        ).toLocaleString("en-IN");
    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <main className="brand-products-page">

                <div className="brand-products-loading">

                    <div className="loading-spinner">
                    </div>

                    <h2>
                        Loading refurbished phones...
                    </h2>

                    <p>
                        Finding available {brandName}
                        {" "}mobiles for you.
                    </p>

                </div>

            </main>
        );
    }


    return (

        <main className="brand-products-page">


            {/* BACK BUTTON */}

            <button
                type="button"
                className="brand-back-button"
                onClick={() =>
                    navigate("/brands")
                }
            >
                <span>←</span>

                Back to All Brands
            </button>


            {/* PAGE HEADER */}

            <section className="brand-products-header">

                <div>

                    <p className="brand-products-label">
                        CERTIFIED PRE-OWNED
                    </p>

                    <h1>
                        Refurbished{" "}
                        <span>
                            {brandName}
                        </span>{" "}
                        Phones
                    </h1>

                    <p className="brand-products-description">

                        Explore our available certified
                        refurbished {brandName} mobiles,
                        quality checked and ready for
                        their next owner.

                    </p>

                </div>


                {!error &&
                 products.length > 0 && (

                    <div className="brand-product-count">

                        <strong>
                            {products.length}
                        </strong>

                        <span>
                            {products.length === 1
                                ? "Mobile Available"
                                : "Mobiles Available"}
                        </span>

                    </div>

                )}

            </section>


            {/* ERROR */}

            {error && (

                <div className="brand-products-error">

                    <div className="brand-state-icon">
                        !
                    </div>

                    <div>

                        <h2>
                            Unable to load mobiles
                        </h2>

                        <p>
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* EMPTY BRAND */}

            {!error &&
             products.length === 0 && (

                <section className="brand-products-empty">

                    <div className="empty-phone-icon">
                        📱
                    </div>

                    <h2>
                        No refurbished {brandName}
                        {" "}phones available
                    </h2>

                    <p>
                        We currently don't have any
                        active {brandName} refurbished
                        mobiles in stock.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/brands")
                        }
                    >
                        ← Explore Other Brands
                    </button>

                </section>

            )}


            {/* PRODUCTS */}

            {!error &&
             products.length > 0 && (

                <section className="brand-products-section">

                    <div className="brand-products-section-title">

                        <div>

                            <h2>
                                Available {brandName}
                                {" "}Mobiles
                            </h2>

                            <p>
                                Choose a device to view
                                complete specifications
                                and details.
                            </p>

                        </div>

                    </div>


                    <div className="brand-products-grid">

                        {products.map(
                            (product) => {

                                const discount =
                                    calculateDiscount(
                                        product.originalPrice,
                                        product.sellingPrice
                                    );

                                const outOfStock =
                                    Number(
                                        product.stockQuantity
                                    ) <= 0;

                                return (

                                    <article
                                        key={product.id}
                                        className="brand-product-card"
                                    >


                                        {/* IMAGE */}

                                        <div className="brand-product-image">

                                            {discount > 0 && (

                                                <span className="brand-discount-badge">

                                                    {discount}% OFF

                                                </span>

                                            )}


                                            {outOfStock && (

                                                <span className="brand-stock-badge">

                                                    OUT OF STOCK

                                                </span>

                                            )}


                                            {product.imageUrl ? (

                                                <img
                                                    src={
                                                        getImageUrl(
                                                            product.imageUrl
                                                        )
                                                    }
                                                    alt={
                                                        product.title
                                                    }
                                                />

                                            ) : (

                                                <div className="brand-no-image">

                                                    <span>
                                                        📱
                                                    </span>

                                                    <p>
                                                        Image not available
                                                    </p>

                                                </div>

                                            )}

                                        </div>


                                        {/* DETAILS */}

                                        <div className="brand-product-info">

                                            <div className="brand-condition-row">

                                                <span className="brand-condition">

                                                    {product.conditionType
                                                        ?.replaceAll(
                                                            "_",
                                                            " "
                                                        ) ||
                                                        "Refurbished"}

                                                </span>

                                            </div>


                                            <h3>
                                                {product.title}
                                            </h3>


                                            <p className="brand-product-color">

                                                {product.color ||
                                                    "Color not specified"}

                                            </p>


                                            <div className="brand-product-price">

                                                <strong>

                                                    ₹
                                                    {formatPrice(
                                                        product.sellingPrice
                                                    )}

                                                </strong>


                                                {Number(
                                                    product.originalPrice
                                                ) >
                                                 Number(
                                                    product.sellingPrice
                                                ) && (

                                                    <del>

                                                        ₹
                                                        {formatPrice(
                                                            product.originalPrice
                                                        )}

                                                    </del>

                                                )}

                                            </div>


                                            <div className="brand-product-benefits">

                                                <p>
                                                    <span>✓</span>

                                                    {product.warranty ||
                                                        "Warranty Available"}
                                                </p>


                                                <p
                                                    className={
                                                        outOfStock
                                                            ? "stock-out"
                                                            : "stock-in"
                                                    }
                                                >

                                                    <span>
                                                        {outOfStock
                                                            ? "✕"
                                                            : "●"}
                                                    </span>

                                                    {outOfStock
                                                        ? "Out of stock"
                                                        : `${product.stockQuantity} in stock`}

                                                </p>

                                            </div>


                                            <button
                                                type="button"
                                                className="brand-view-product"
                                                disabled={outOfStock}
                                                onClick={() =>
                                                    navigate(
                                                        `/products/${product.id}`
                                                    )
                                                }
                                            >

                                                {outOfStock
                                                    ? "Currently Unavailable"
                                                    : "View Product →"}

                                            </button>

                                        </div>

                                    </article>

                                );

                            }
                        )}

                    </div>

                </section>

            )}

        </main>
    );
}

export default BrandProducts;