import { useEffect, useState } from "react";
import { getMyRepairBookings } from "../../services/api";

function MyRepairBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    async function loadBookings() {
        try {
            const data = await getMyRepairBookings();
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (bookings.length === 0) {
        return <h2>No repair bookings found.</h2>;
    }

    return (
        <div className="container" style={{ padding: "40px" }}>
            <h1>My Repair Bookings</h1>

            {bookings.map((booking) => (
                <div
                    key={booking.id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "20px",
                        marginBottom: "20px"
                    }}
                >
                    <h3>{booking.bookingNumber}</h3>

                    <p>
                        <strong>Customer:</strong> {booking.customerName}
                    </p>

                    <p>
                        <strong>Phone:</strong> {booking.phone}
                    </p>

                    <p>
                        <strong>Date:</strong> {booking.pickupDate}
                    </p>

                    <p>
                        <strong>Total:</strong> ₹{booking.totalPrice}
                    </p>

                    <p>
                        <strong>Status:</strong> {booking.bookingStatus}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default MyRepairBookings;