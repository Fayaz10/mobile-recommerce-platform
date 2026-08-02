import { Link } from "react-router-dom";

import apple from "../assets/brands/apple.svg";
import samsung from "../assets/brands/samsung.svg";
import oneplus from "../assets/brands/oneplus.svg";
import xiaomi from "../assets/brands/xiaomi.svg";
import vivo from "../assets/brands/vivo.svg";
import oppo from "../assets/brands/oppo.svg";
import realme from "../assets/brands/realme.svg";
import google from "../assets/brands/google.svg";
import motorola from "../assets/brands/motorola.svg";
import nothing from "../assets/brands/nothing.svg";

const brands = [
    { id: 1, name: "Apple", logo: apple },
    { id: 2, name: "Samsung", logo: samsung },
    { id: 3, name: "OnePlus", logo: oneplus },
    { id: 4, name: "Vivo", logo: vivo },
    { id: 5, name: "Xiaomi", logo: xiaomi },
    { id: 6, name: "Oppo", logo: oppo },
    { id: 7, name: "Google", logo: google },
    { id: 8, name: "Realme", logo: realme },
    { id: 9, name: "Motorola", logo: motorola },
    { id: 13, name: "Nothing", logo: nothing }
];

function BrandSection() {

    return (
        <section
            className="section brand-section"
            id="brands"
        >

            <div className="section-heading">

                <div>

                    <p className="section-label">
                        FIND YOUR DEVICE
                    </p>

                    <h2>
                        Shop by Brand
                    </h2>

                    <p>
                        Choose your mobile brand to explore refurbished phones.
                    </p>

                </div>


            </div>


            <div className="brand-grid">

              {brands.map((brand) => (

                 <Link
                     key={brand.id}
                     to={`/brands/${brand.id}`}
                     state={{
                            brandName: brand.name
                     }}
                      className="brand-card-link"
                 >

                      <div className="brand-card">

                         <img
                             src={brand.logo}
                             alt={brand.name}
                             className="brand-logo"
                         />

                     </div>

                 </Link>

               ))}

            </div>

            


            <div className="brand-view-all">

                <Link to="/brands">
                    View All Brands →
                </Link>

            </div>

        </section>
    );
}

export default BrandSection;