import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../../services/api";
import RepairBrandCard from "./RepairBrandCard";

function RepairBrandSection() {

    const navigate = useNavigate();

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadBrands() {

            try {

                const data = await getBrands();

                setBrands(data);

            } catch (error) {

                console.error("Error loading brands:", error);

            } finally {

                setLoading(false);

            }

        }

        loadBrands();

    }, []);

const handleBrandClick = (brand) => {

    const slug = brand.name.toLowerCase();

    navigate(`/repair/${slug}`, {
        state: {
            brandId: brand.id,
            brandName: brand.name
        }
    });

};

    if (loading) {
        return (
            <section className="repair-brand-section">
                <h3>Loading brands...</h3>
            </section>
        );
    }

    return (

        <section className="repair-brand-section">

            <div className="repair-section-header">

                <h2>Select Your Brand</h2>

                <p>
                    Choose your mobile brand to continue with the repair booking.
                </p>

            </div>

            <div className="repair-brand-grid">

                {brands.map((brand) => (

                    <RepairBrandCard
                        key={brand.id}
                        brand={brand}
                        selected={false}
                        onClick={handleBrandClick}
                    />

                ))}

            </div>

        </section>

    );

}

export default RepairBrandSection;