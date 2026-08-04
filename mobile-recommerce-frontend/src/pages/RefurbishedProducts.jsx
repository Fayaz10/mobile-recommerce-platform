import {
    useEffect,
    useState
} from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import {
    getProducts
} from "../services/api";

import ProductFilters from "../components/product/ProductFilters";

import LoadingSpinner
from "../components/common/LoadingSpinner";

import EmptyState
from "../components/common/EmptyState";

import ErrorState
from "../components/common/ErrorState";


function RefurbishedProducts() {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [filters, setFilters] = useState({

    search: ""

});    


    useEffect(() => {

        async function loadProducts() {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getProducts();

                setProducts(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (error) {

                console.error(
                    "Unable to load refurbished products:",
                    error
                );

                setError(
                    "Unable to load refurbished mobiles."
                );

            } finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, []);

    const filteredProducts = products.filter((product) => {

    const search = filters.search.toLowerCase();

    return (

        product.title?.toLowerCase().includes(search) ||

        product.deviceVariant?.deviceModel?.name
            ?.toLowerCase()
            .includes(search)

    );

});


    return (

        <>

            <Navbar />


            <main className="all-products-page">

                {/* PAGE HEADER */}

                <section className="all-products-header">

                    <span className="section-label">
                        CERTIFIED PRE-OWNED
                    </span>

                    <h1>
                        All Refurbished Mobiles
                    </h1>

                    <p>
                        Browse our complete collection of
                        quality certified refurbished smartphones.
                    </p>

                </section>

               <ProductFilters
                   filters={filters}
                   setFilters={setFilters}
               />


                {/* LOADING */}

                {loading && (

                   <LoadingSpinner
    text="Loading refurbished mobiles..."
/>

                )}


                {/* ERROR */}

                {!loading && error && (

                    <ErrorState

    title="Unable to load mobiles"

    message={error}

/>

                )}


                {/* NO PRODUCTS */}

                {!loading &&
                 !error &&
                 products.length === 0 && (

                    <EmptyState

    title="No Refurbished Mobiles"

    message="Please check again later."

/>

                )}


                {/* ALL PRODUCTS */}

                {!loading &&
                 !error &&
                 filteredProducts.length > 0 && (

                    <>

                        <div className="products-result-bar">

                            <strong>
                                Refurbished Mobiles
                            </strong>

                            <span>
                                {products.length}
                                {" "}
                                {products.length === 1
                                    ? "product"
                                    : "products"}
                            </span>

                        </div>


                        <div className="product-grid all-products-grid">

                            {filteredProducts.map(
                                (product) => (

                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />

                                )
                            )}

                        </div>

                    </>

                )}

            </main>

        </>

    );

}


export default RefurbishedProducts;