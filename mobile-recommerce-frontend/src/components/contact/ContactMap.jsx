import "./ContactMap.css";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock
} from "react-icons/fa";

function ContactMap() {

    return (

        <section className="contact-map-section">

            <div className="contact-info">

                <span>CONTACT US</span>

                <h2>Visit Our Store</h2>

                <p>
                    Visit Ambattur Mobiles Shop for expert mobile repairs, refurbished smartphones,
                    accessories, and professional customer support.
                </p>

                <div className="contact-item">

                    <FaMapMarkerAlt />

                    <div>

                        <p>
                            No. XX, Mannurpet, Ambattur Estate,
                            Chennai, Tamil Nadu
                        </p>

                    </div>

                </div>

                <div className="contact-item">

                    <FaPhoneAlt />

                    <div>

                        <p>+91 98765 45570</p>

                        <p>+91 98765 43210</p>

                    </div>

                </div>

                <div className="contact-item">

                    <FaEnvelope />

                    <div>

                        <p>support@ambatturmobiles.in</p>

                    </div>

                </div>

                <div className="contact-item">

                    <FaClock />

                    <div>

                        <p>All Days : 9:00 AM - 10:00 PM</p>

                    </div>

                </div>

            </div>

            <div className="map-container">

                <iframe
                    title="TheFoneFix Location"
                    src="https://www.google.com/maps?q=Poonamallee,Chennai&output=embed"
                    loading="lazy"
                    allowFullScreen
                />

            </div>

        </section>

    );

}

export default ContactMap;