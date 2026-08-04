import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/api";

import Navbar from "../components/Navbar";
import HeroSlider from "../components/hero/HeroSlider";
import RepairSection from "../components/repair/RepairSection";
import HotDeals from "../components/deals/HotDeals";
import BrandSection from "../components/BrandSection";
import AccessoriesCarousel from "../components/accessories/AccessoriesCarousel";
import Reviews from "../components/reviews/Reviews";
import WhyChooseUs from "../components/whychoose/WhyChooseUs";
import ProductCard from "../components/ProductCard";
import Footer from "../components/footer/Footer";
import Carousel from "../components/common/Carousel";

function Home() {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        getProducts()
            .then(setProducts)

            .catch((error) => {

                console.error(error);

                setError(
                    "Unable to load refurbished mobiles."
                );
            })

            .finally(() => {

                setLoading(false);

            });

    }, []);


    return (

        <>

            <Navbar />


            <main>

                {/* =====================================
                    MAIN REPAIR HERO
                ===================================== */}

                <HeroSlider />

                <RepairSection />

                <HotDeals />

                {/* =====================================
                    SHOP BY BRAND
                ===================================== */}

                <BrandSection />

                <AccessoriesCarousel />

                {/* =====================================
                    REFURBISHED MOBILES
                ===================================== */}

                <section
                    className="section refurbished-section"
                    id="refurbished"
                >

                    <div className="section-heading">

                        <div>

                            <span className="section-label">
                                CERTIFIED PRE-OWNED
                            </span>

                            <h2>
                                Refurbished Mobiles
                            </h2>

                            <p>
                                Explore quality refurbished
                                smartphones at great prices.
                            </p>

                        </div>

                    </div>


                    {loading && (

                        <p>
                            Loading refurbished mobiles...
                        </p>

                    )}


                    {error && (

                        <p className="error-message">
                            {error}
                        </p>

                    )}


                    {!loading &&
                     !error &&
                     products.length === 0 && (

                        <div className="empty-products">

                            <h3>
                                No refurbished mobiles available
                            </h3>

                            <p>
                                Please check again later.
                            </p>

                        </div>

                    )}


                    <div className="product-grid home-product-grid">

                     {products
                     .slice(0, 4)
                     .map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                           />

                      ))}

                    </div>
                    
                    <div className="refurbished-view-all">
                      
                      <Link
                         to="/refurbished"
                         className="refurbished-view-all-button"
                      >
                        View All Refurbished Products →
                      </Link>
                    </div>

                </section>

            </main>

            <Reviews />
            
            <WhyChooseUs />


            {/* =====================================
                FOOTER
            ===================================== */}


            <Footer/>

        </>

    );
}


export default Home;