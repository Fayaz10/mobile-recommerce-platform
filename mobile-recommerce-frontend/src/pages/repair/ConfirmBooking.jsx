import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";


 
function ConfirmBooking() {

    const navigate = useNavigate();

    const location = useLocation();

    const {
        brand,
        brandId,
        modelName,
        modelId,
        selectedServices,
        total
    } = location.state || {};

    const [customerName, setCustomerName] = useState("");
    const [customerMobile, setCustomerMobile] = useState("");
    const [customerNotes, setCustomerNotes] = useState("");


    return (

        <>

            <Navbar />


            <main className="book-repair-page">

    <section className="book-repair-header">

        <span className="section-label">
            PROFESSIONAL MOBILE REPAIR
        </span>

        <h1>Complete Your Repair Booking</h1>

        <p>
            Review your selected device and repair,
            then enter your contact details.
        </p>

    </section>

    <section className="repair-details-section">

        <div className="repair-selection-heading">

            <span className="repair-step-label">
                BOOKING
            </span>

            <h2>Selected Device</h2>

        </div>

        <div className="booking-summary-card">

            <p>
                <strong>Brand:</strong> {brand}
            </p>

            <p>
                <strong>Model:</strong> {modelName}
            </p>

        </div>

    </section>

    <section className="repair-details-section">

        <div className="repair-selection-heading">

            <h2>Selected Repairs</h2>

        </div>

        <div className="booking-summary-card">

            {selectedServices?.map(service => (

                <div key={service.id}>

                    <p>
                        {service.problemName || service.name}
                    </p>

                    <p>
                        ₹{service.price}
                    </p>

                </div>

            ))}

            <hr />

            <h3>Total : ₹{total}</h3>

        </div>

    </section>

    <section className="repair-details-section">

        <div className="repair-selection-heading">

            <h2>Your Details</h2>

        </div>

        <div className="repair-form">

            <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) =>
                    setCustomerName(e.target.value)
                }
            />

            <input
                type="tel"
                placeholder="Mobile Number"
                value={customerMobile}
                onChange={(e) =>
                    setCustomerMobile(e.target.value)
                }
            />

            <textarea
                rows="4"
                placeholder="Additional Notes"
                value={customerNotes}
                onChange={(e) =>
                    setCustomerNotes(e.target.value)
                }
            />

            <button
    className="continue-btn"
    onClick={() => {

        if (!customerName.trim()) {
            alert("Please enter your full name.");
            return;
        }

        if (!customerMobile.trim()) {
            alert("Please enter your mobile number.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(customerMobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        navigate("/repair/select-date-time", {
            state: {
                brand,
                brandId,
                modelName,
                modelId,
                selectedServices,
                total,
                customerName,
                customerMobile,
                customerNotes
            }
        });

    }}
>
    Continue →
            </button>

        </div>

    </section>

</main>

            <Footer />

        </>

    );
}


export default ConfirmBooking;