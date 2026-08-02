import { Link } from "react-router-dom";

function ProductCard({ product }) {

    const BACKEND_URL = "http://localhost:8080";

    // ==========================================
    // CALCULATE DISCOUNT
    // ==========================================

    const discount =
        product.originalPrice > product.sellingPrice
            ? Math.round(
                (
                    (product.originalPrice -
                        product.sellingPrice) /
                    product.originalPrice
                ) * 100
            )
            : 0;


    // ==========================================
    // BUILD PRODUCT IMAGE URL
    // ==========================================

    const getImageUrl = () => {

        if (!product.imageUrl) {
            return null;
        }

        if (
            product.imageUrl.startsWith("http://") ||
            product.imageUrl.startsWith("https://")
        ) {
            return product.imageUrl;
        }

        return `${BACKEND_URL}${
            product.imageUrl.startsWith("/")
                ? product.imageUrl
                : `/${product.imageUrl}`
        }`;
    };

    const imageUrl = getImageUrl();

    const inStock =
        Number(product.stockQuantity) > 0;


    return (

        <article className="product-card">

            {/* IMAGE AREA */}

            <div className="product-image">

                {/* DISCOUNT */}

                {discount > 0 && (

                    <span className="discount-badge">
                        {discount}% OFF
                    </span>

                )}


                {/* CONDITION BADGE */}

                {product.conditionType && (

                    <span className="product-condition-badge">

                        {product.conditionType
                            .replaceAll("_", " ")}

                    </span>

                )}


                {imageUrl ? (

                    <img
                        src={imageUrl}
                        alt={product.title}
                        loading="lazy"
                    />

                ) : (

                    <div className="product-image-placeholder">

                        <span>📱</span>

                        <small>
                            Image coming soon
                        </small>

                    </div>

                )}

            </div>


            {/* PRODUCT DETAILS */}

            <div className="product-info">

                <div className="product-card-top">

                    <p className="product-category">
                        CERTIFIED REFURBISHED
                    </p>

                    <h3>
                        {product.title}
                    </h3>

                    {product.color && (

                        <p className="product-details">

                            <span className="product-detail-label">
                                Color:
                            </span>

                            {" "}

                            {product.color}

                        </p>

                    )}

                </div>


                {/* PRICE */}

                <div className="price">

                    <strong>

                        ₹{Number(
                            product.sellingPrice || 0
                        ).toLocaleString("en-IN")}

                    </strong>


                    {product.originalPrice >
                        product.sellingPrice && (

                        <del>

                            ₹{Number(
                                product.originalPrice
                            ).toLocaleString("en-IN")}

                        </del>

                    )}

                </div>


                {/* BENEFITS */}

                <div className="product-benefits">

                    {product.warranty && (

                        <p className="warranty">

                            <span>✓</span>

                            {product.warranty} Warranty

                        </p>

                    )}


                    <p
                        className={
                            inStock
                                ? "stock in-stock"
                                : "stock out-stock"
                        }
                    >

                        <span>
                            {inStock ? "●" : "×"}
                        </span>

                        {inStock
                            ? `${product.stockQuantity} in stock`
                            : "Out of stock"}

                    </p>

                </div>


                {/* ACTION */}

                {inStock ? (

                    <Link
                        to={`/products/${product.id}`}
                        className="view-button"
                    >

                        View Product

                        <span>→</span>

                    </Link>

                ) : (

                    <button
                        type="button"
                        className="view-button"
                        disabled
                    >

                        Out of Stock

                    </button>

                )}

            </div>

        </article>

    );
}

export default ProductCard;