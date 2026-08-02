import "./WhyChooseUs.css";
import {
    FaTools,
    FaShieldAlt,
    FaClock,
    FaRupeeSign,
    FaMobileAlt,
    FaUsers
} from "react-icons/fa";

const features = [
    {
        icon: <FaTools />,
        title: "Expert Technicians",
        description:
            "Highly experienced technicians with years of smartphone repair expertise."
    },
    {
        icon: <FaShieldAlt />,
        title: "Warranty Support",
        description:
            "All repairs are backed by service warranty for complete peace of mind."
    },
    {
        icon: <FaClock />,
        title: "Same Day Repair",
        description:
            "Most mobile repairs are completed within 30 to 60 minutes."
    },
    {
        icon: <FaRupeeSign />,
        title: "Affordable Pricing",
        description:
            "Transparent pricing with no hidden charges."
    },
    {
        icon: <FaMobileAlt />,
        title: "Genuine Spare Parts",
        description:
            "Only premium-quality and genuine replacement parts are used."
    },
    {
        icon: <FaUsers />,
        title: "5000+ Happy Customers",
        description:
            "Thousands of satisfied customers trust us for their mobile repairs."
    }
];

function WhyChooseUs() {

    return (

        <section className="why-section">

            <div className="why-header">

                <span>WHY CHOOSE US</span>

                <h2>Why Customers Trust TheFoneFix</h2>

                <p>
                    We combine quality repairs, experienced technicians, genuine parts,
                    affordable pricing, and fast turnaround to deliver the best mobile
                    service experience.
                </p>

            </div>

            <div className="why-grid">

                {features.map((item, index) => (

                    <div
                        key={index}
                        className="why-card"
                    >

                        <div className="why-icon">

                            {item.icon}

                        </div>

                        <h3>

                            {item.title}

                        </h3>

                        <p>

                            {item.description}

                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default WhyChooseUs;