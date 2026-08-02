import Carousel from "../common/Carousel";
import "./AccessoriesCarousel.css";
import { Link } from "react-router-dom";

const accessories = [
    {
        icon: "🎧",
        name: "Wireless Earbuds",
        description: "Crystal clear sound with long battery life."
    },
    {
        icon: "🔌",
        name: "Fast Chargers",
        description: "Original fast charging adapters and cables."
    },
    {
        icon: "📱",
        name: "Phone Cases",
        description: "Stylish and protective covers for every model."
    },
    {
        icon: "🛡",
        name: "Tempered Glass",
        description: "9H premium screen protection."
    },
    {
        icon: "🔋",
        name: "Power Banks",
        description: "High-capacity portable charging solutions."
    },
    {
        icon: "⌚",
        name: "Smart Watches",
        description: "Latest smart wearables at affordable prices."
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

                        <div className="accessory-icon">

                            {item.icon}

                        </div>

                        <h3>

                            {item.name}
                            <p>{item.description}</p>

                        </h3>
                        

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