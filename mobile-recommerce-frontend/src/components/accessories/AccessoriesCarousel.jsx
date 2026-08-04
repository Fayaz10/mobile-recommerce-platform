import Carousel from "../common/Carousel";
import "./AccessoriesCarousel.css";
import { Link } from "react-router-dom";

import earbuds from "../../assets/accessories/earbuds.png";
import charger from "../../assets/accessories/charger.png";
import phoneCase from "../../assets/accessories/phone-case.png";
import temperedGlass from "../../assets/accessories/tempered-glass.png";
import powerBank from "../../assets/accessories/power-bank.png";
import smartWatch from "../../assets/accessories/smart-watch.png";

const accessories = [
{
    image: earbuds,
    name: "Wireless Earbuds",
    description: "Crystal clear sound with long battery life."
},
{
    image: charger,
    name: "Fast Chargers",
    description: "Original fast charging adapters and cables."
},
{
    image: phoneCase,
    name: "Phone Cases",
    description: "Stylish and protective covers."
},
{
    image: temperedGlass,
    name: "Tempered Glass",
    description: "9H premium screen protection."
},
{
    image: powerBank,
    name: "Power Banks",
    description: "High-capacity portable charging."
},
{
    image: smartWatch,
    name: "Smart Watches",
    description: "Latest smart wearables."
}
];

function AccessoriesCarousel() {

    return (

        <section
            className="accessories-section"
            id="accessories"
        >

            <div className="accessories-header">

                <span>BEST SELLING</span>

                <h2>Mobile Accessories</h2>

                <p>

                    Genuine accessories for all leading smartphone brands.

                </p>

            </div>

            <Carousel>

                {accessories.map((item, index) => (

                    <div
                        key={index}
                        className="accessory-card"
                    >

                        <div className="accessory-image-container">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="accessory-image"
                            />
                        </div>

                        <div className="repair-overlay">

                            <h3>{item.name}</h3>

                        </div>
                        

                    </div>

                ))}

            </Carousel>

            <div className="accessories-button">

                <Link
                    to="/contact"
                    className="shop-accessories"
                >

                    Enquire Accessories

                </Link>

            </div>

        </section>

    );

}

export default AccessoriesCarousel;