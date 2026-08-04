import "../../styles/repair/RepairSection.css";
import Carousel from "../common/Carousel";
import { Link } from "react-router-dom";

import screen from "../../assets/repair/screen.png";
import battery from "../../assets/repair/battery.png";
import water from "../../assets/repair/water.png";
import charging from "../../assets/repair/charging.png";
import camera from "../../assets/repair/camera.png";
import software from "../../assets/repair/software.png";

const repairs = [
    {
        image: screen,
        title: "Screen Replacement",
        description: "Broken screen? We replace it with premium quality parts."
    },
    {
        image: battery,
        title: "Battery Replacement",
        description: "Restore your phone's battery life with genuine batteries."
    },
    {
        image: water,
        title: "Water Damage",
        description: "Professional cleaning and motherboard repair."
    },
    {
        image: charging,
        title: "Charging Issues",
        description: "Charging port and power IC repair."
    },
    {
        image: camera,
        title: "Camera Repair",
        description: "Front and rear camera replacement."
    },
    {
        image: software,
        title: "Software Repair",
        description: "Unlock, flashing, boot loop and software fixes."
    }
];

function RepairSection() {

    return (

        <section className="repair-section">

            <div className="repair-header">

                <span>OUR SERVICES</span>

                <h2>Professional Mobile Repair Services</h2>

                <p>
                    Fast, reliable and affordable repair services for all major smartphone brands.
                </p>

            </div>

            <Carousel>

    {repairs.map((repair, index) => (

        <div
            className="repair-card"
            key={index}
        >

            <div className="repair-image-container">

                <img
                    src={repair.image}
                    alt={repair.title}
                    className="repair-image"
                />

            </div>

            <div className="repair-overlay">

                <h3>{repair.title}</h3>

            </div>

        </div>

    ))}

            </Carousel>

            <div className="repair-button-area">

                <Link
                    to="/repair"
                    className="repair-button"
                >
                    Book Repair Now
                </Link>

            </div>

        </section>

    );

}

export default RepairSection;