import { Link } from "react-router-dom";

function BookingSuccess() {

    return (

        <div className="repair-success">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>Booking Confirmed</h1>

                <p>
                    Your repair booking has been submitted successfully.
                </p>

                <p>
                    Our technician will contact you shortly.
                </p>

                <Link
                    to="/"
                    className="success-btn"
                >
                    Back to Home
                </Link>

            </div>

        </div>

    );

}

export default BookingSuccess;