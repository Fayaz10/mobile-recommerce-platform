import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";

function Footer() {

  const year = new Date().getFullYear();

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* ================= Company ================= */}

        <div className="footer-column">

          <div className="footer-logo">

            <h2>

              <span className="logo-dark">
                AMBATTUR
              </span>

              <br />

              <span className="logo-orange">
                MOBILES
              </span>

            </h2>

          </div>

          <p className="footer-description">

            Premium mobile repair and refurbished smartphones at the best prices.
            We provide genuine spare parts, expert technicians and trusted
            service across Ambattur.

          </p>

          <div className="footer-social">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* ================= Quick Links ================= */}

        <div className="footer-column">

          <h3>
            QUICK LINKS
          </h3>

          <span className="footer-line"></span>

          <nav className="footer-links">

            <a href="/">Home</a>

            <a href="/repair">Book Repair</a>

            <a href="/refurbished">Refurbished Mobiles</a>

            <a href="/accessories">Accessories</a>

            <a href="/contact">Contact Us</a>

          </nav>

        </div>

        {/* ================= Services ================= */}

        <div className="footer-column">

          <h3>
            SERVICES
          </h3>

          <span className="footer-line"></span>

          <div className="footer-services">

            <p>Screen Replacement</p>

            <p>Battery Replacement</p>

            <p>Water Damage Repair</p>

            <p>Camera Repair</p>

            <p>Software Repair</p>

          </div>

        </div>

        {/* ================= Contact ================= */}

        <div className="footer-column">

          <h3>
            CONTACT US
          </h3>

          <span className="footer-line"></span>

          <div className="contact-list">

            <div className="contact-item">

              <FaMapMarkerAlt />

              <p>
                Ambattur, Chennai, Tamil Nadu
              </p>

            </div>

            <div className="contact-item">

              <FaPhoneAlt />

              <p>
                +91 98765 43210
              </p>

            </div>

            <div className="contact-item">

              <FaEnvelope />

              <p>
                support@ambatturmobiles.in
              </p>

            </div>

            <div className="contact-item">

              <FaClock />

              <p>
                Mon – Sat | 9:00 AM – 9:00 PM
              </p>

            </div>

          </div>

          {/* Google Map */}

          <iframe
            className="footer-map"
            title="Ambattur Mobiles Location"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Ambattur,+Chennai&output=embed"
          />

        </div>

      </div>

      {/* ================= Bottom ================= */}

      <div className="footer-bottom">

        © {year} Ambattur Mobiles. All Rights Reserved.

      </div>

    </footer>

  );

}

export default Footer;