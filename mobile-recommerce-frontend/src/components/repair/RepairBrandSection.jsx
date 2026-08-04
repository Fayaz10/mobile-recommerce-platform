import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../../services/api";
import RepairBrandCard from "./RepairBrandCard";

import apple from "../../assets/brands/apple.svg";
import samsung from "../../assets/brands/samsung.svg";
import oneplus from "../../assets/brands/oneplus.svg";
import vivo from "../../assets/brands/vivo.svg";
import xiaomi from "../../assets/brands/xiaomi.svg";
import oppo from "../../assets/brands/oppo.svg";
import google from "../../assets/brands/google.svg";
import realme from "../../assets/brands/realme.svg";
import motorola from "../../assets/brands/motorola.svg";
import iqoo from "../../assets/brands/iqoo.svg";
import poco from "../../assets/brands/poco.svg";
import tecno from "../../assets/brands/tecno.svg";
import nothing from "../../assets/brands/nothing.svg";
import nokia from "../../assets/brands/nokia.svg";
import honor from "../../assets/brands/honor.svg";
import asus from "../../assets/brands/asus.svg";
import huawei from "../../assets/brands/huawei.svg";

function RepairBrandSection() {

    const navigate = useNavigate();

    const brandLogos = {

    Apple: apple,

    Samsung: samsung,

    Oneplus: oneplus,

    vivo: vivo,

    Xiaomi: xiaomi,

    Oppo: oppo,

    Google: google,

    Realme: realme,

    Motorola: motorola,

    iQOO: iqoo,

    Poco: poco,

    Tecno: tecno,

    Nothing: nothing,

    Nokia: nokia,

    Honor: honor,

    Asus: asus,

    Huawei: huawei

};

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadBrands() {

            try {

                const data = await getBrands();

                const brandsWithLogos = data.map((brand) => ({

                     ...brand,

                     logo: brandLogos[brand.name] || null

               }));

            setBrands(brandsWithLogos);

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