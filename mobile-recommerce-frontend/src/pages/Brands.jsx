import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllBrands } from "../services/api";


import brandLogos from "../assets/brands/brandLogos";





function Brands() {

    const [brands, setBrands] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const navigate =
        useNavigate();


    // ==========================================
    // LOAD REAL BRANDS FROM BACKEND
    // ==========================================

    useEffect(() => {

        async function loadBrands() {

            try {

                const data =
                    await getAllBrands();

                setBrands(data);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load brands."
                );

            } finally {

                setLoading(false);
            }
        }

        loadBrands();

    }, []);


    // ==========================================
    // OPEN SELECTED BRAND
    // ==========================================

    function handleBrandClick(brand) {

        navigate(
            `/brands/${brand.id}`,
            {
                state: {
                    brandName:
                        brand.name
                }
            }
        );
    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div
                className="brands-page"
            >

                <h2>
                    Loading brands...
                </h2>

            </div>
        );
    }


    return (

        <main className="brands-page">


            {/* PAGE HEADER */}

            <div className="brands-page-header">

                <p className="section-label">
                    FIND YOUR DEVICE
                </p>

                <h1>
                    Shop by Brand
                </h1>

                <p>
                    Choose your preferred brand to explore
                    our available refurbished mobiles.
                </p>

            </div>


            {/* ERROR */}

            {error && (

                <p className="error-message">

                    {error}

                </p>

            )}


            {/* BRAND GRID */}

            <div className="brands-full-grid">

                {brands.map((brand) => {

                    const normalizedName =
                        brand.name
                            .toLowerCase()
                            .replace(/\s+/g, "");

                    const logo =
                        brandLogos[
                            normalizedName
                        ];


                    return (

                        <button
                            type="button"
                            key={brand.id}
                            className="brands-full-card"
                            onClick={() =>
                                handleBrandClick(
                                    brand
                                )
                            }
                        >

                            {/* LOGO */}

                            <div className="brands-full-logo">

                                {logo ? (

                                    <img
                                        src={logo}
                                        alt={
                                            `${brand.name} logo`
                                        }
                                        onError={(event) => {

                                            event.currentTarget
                                                .style
                                                .display =
                                                "none";

                                            event.currentTarget
                                                .nextElementSibling
                                                .style
                                                .display =
                                                "flex";
                                        }}
                                    />

                                ) : null}


                                <div
                                    className={
                                        logo
                                            ? "brands-logo-fallback"
                                            : "brands-logo-fallback show"
                                    }
                                >

                                    {brand.name}

                                </div>

                            </div>


                            {/* NAME */}

                            <h3>
                                {brand.name}
                            </h3>

                        </button>

                    );

                })}

            </div>


            {/* EMPTY */}

            {!error &&
             brands.length === 0 && (

                <div className="brands-empty">

                    <h2>
                        No brands available
                    </h2>

                    <p>
                        Add mobile brands from
                        the admin/backend.
                    </p>

                </div>

            )}

        </main>
    );
}


export default Brands;