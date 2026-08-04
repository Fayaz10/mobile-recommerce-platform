

import "./WhyChooseUs.css";

import technician from "../../assets/why/technician.png";
import warranty from "../../assets/why/warranty.png";
import repair from "../../assets/why/repair.png";
import price from "../../assets/why/price.png";
import spareparts from "../../assets/why/spareparts.png";
import customers from "../../assets/why/customers.png";

const features = [

    {
        icon: technician,
        title: "Expert Technicians",
        description:
            "Highly experienced technicians with years of smartphone repair expertise."
},

    {
        icon: warranty,
        title: "Warranty Support",
        description:
            "All repairs are backed by service warranty for complete peace of mind."
    },

    {
        icon: repair,
        title: "Same Day Repair",
        description:
            "Most mobile repairs are completed within 30 to 60 minutes."
    },

    {
        icon: price,
        title: "Affordable Pricing",
        description:
            "Transparent pricing with no hidden charges."
    },

    {
        icon: spareparts,
        title: "Genuine Spare Parts",
        description:
            "Only premium-quality and genuine replacement parts are used."
    },

    {
        icon: customers,
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

                <h2>Why Customers Trust AmbatturMobiles</h2>

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

                   <img
                         src={item.icon}
                         alt={item.title}
                         className="why-image"
                   />

                      <div className="why-overlay">

                        <div className="why-content">

                         <h3>{item.title}</h3>

                         <div className="why-line"></div>

                         <p>{item.description}</p>

                        </div>

                     </div>

                </div>

                ))}

            </div>

        </section>

    );

}

export default WhyChooseUs;