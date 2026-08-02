import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/repair/SelectAppointment.css";

function SelectAppointment() {

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
       customerNotes
    } = location.state || {};

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const timeSlots = [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM"
    ];

    const today = new Date();

const todayString =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const currentMinutes =
    today.getHours() * 60 + today.getMinutes();

function convertTimeToMinutes(time) {

    const [clock, period] = time.split(" ");

    let [hours, minutes] = clock.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
}


    return (

        <main className="select-datetime-page">

            <div className="datetime-card">

                <h1>Select Date & Time</h1>

                <p>
                    Choose your preferred repair appointment.
                </p>

                <label>Select Date</label>

                <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                        setSelectedDate(e.target.value)
                    }
                />

                <label>Select Time Slot</label>

                <div className="time-slot-grid">

                    {timeSlots.map((slot) => {

                        const disabled =
                           selectedDate === todayString &&
                            convertTimeToMinutes(slot) <= currentMinutes;

                            console.log("Selected Date:", selectedDate);
console.log("Today:", todayString);
console.log("Current Minutes:", currentMinutes);

                        return (

                           <button
                               key={slot}
                               type="button"
                               disabled={disabled}
                               className={
                selectedTime === slot
                    ? "time-slot selected"
                    : "time-slot"
            }
            onClick={() => setSelectedTime(slot)}
        >
            {slot}
        </button>

    );

                    })}

                </div>

                <div className="booking-summary-card">

    <h3>Booking Summary</h3>

    <p><strong>Brand:</strong> {brand}</p>

    <p><strong>Model:</strong> {modelName}</p>

    <hr />

    {selectedServices?.map(service => (

        <div key={service.id}>

            <p>
                {service.problemName || service.name}
            </p>

            <p>₹{service.price}</p>

        </div>

    ))}

    <hr />

    <h3>Total : ₹{total}</h3>

                </div>

                <div className="datetime-buttons">

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>

                    <button
                        type="button"
                        className="continue-btn"
                        disabled={
                            !selectedDate ||
                            !selectedTime
                        }
                        
                        
                        onClick={() => {

                          if (!selectedDate) {
        alert("Please select a date.");
        return;
                          }

                          if (!selectedTime) {
                                alert("Please select a time slot.");
                          return;
                          }

    navigate("/repair/confirmation", {
        state: {
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
        }
    });

                        }}
                    >
                        Continue →
                    </button>

                </div>

            </div>

        </main>

    );

}

export default SelectAppointment;