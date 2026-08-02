import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookRepair } from "../../services/api";
import "../../styles/repair/ReviewBooking.css";

function ReviewBooking() {

    const navigate = useNavigate();

    const location = useLocation();

    const {
    brand,
    brandId,
    modelName,
    modelId,
    selectedServices,
    total,
    customerName,
    customerMobile,
    customerNotes,
    selectedDate,
    selectedTime
    } = location.state || {};

    async function handleConfirmBooking() {

    try {

        await bookRepair({

            brandId,
            modelId,

            serviceIds: selectedServices.map(
                service => service.id
            ),

            customerName,
            customerMobile,
            customerNotes,

            appointmentDate: selectedDate,
            appointmentTime: selectedTime

        });

        navigate("/repair/booked");

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

    return (

        <main className="booking-confirmation-page">

            <div className="confirmation-card">

                <h1>Confirm Your Booking</h1>

                <p>
                    Please review your repair booking before confirming.
                </p>

                <div className="confirmation-summary">

                <p>
                   <strong>Brand:</strong> {brand}
                </p>

                <p>
                  <strong>Model:</strong> {modelName}
                </p>

            <hr />

                <strong>Repairs</strong>

                {selectedServices?.map(service => (

                   <p key={service.id}>
                        {service.problemName || service.name}
                        {" "}
                        - ₹{service.price}
                   </p>

                ))}

            <hr />

    <p>
        <strong>Customer:</strong> {customerName}
    </p>

    <p>
        <strong>Mobile:</strong> {customerMobile}
    </p>

    <p>
        <strong>Date:</strong> {selectedDate}
    </p>

    <p>
        <strong>Time:</strong> {selectedTime}
    </p>

    <p>
        <strong>Notes:</strong> {customerNotes || "-"}
    </p>

    <hr />

    <h2>Total : ₹{total}</h2>

                </div>

                <div className="confirmation-buttons">

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>

                    <button
                        type="button"
                        className="confirm-btn"
                        onClick={handleConfirmBooking}
                    >
                        Confirm Booking
                    </button>

                </div>

            </div>

        </main>

    );

}

export default ReviewBooking;