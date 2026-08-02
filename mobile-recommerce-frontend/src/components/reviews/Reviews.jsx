import Carousel from "../common/Carousel";
import "./Reviews.css";

const reviews = [
    {
        id: 1,
        name: "Arun Kumar",
        location: "Ambattur",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=12",
        service: "iPhone 13 Screen Replacement",
        review:
            "Excellent service. My iPhone screen was replaced within 30 minutes. The quality is outstanding and the staff were very professional."
    },
    {
        id: 2,
        name: "Priya S",
        location: "Avadi",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=32",
        service: "Refurbished iPhone 14",
        review:
            "Bought a refurbished iPhone 14. It looks brand new and came with warranty. Definitely worth the price."
    },
    {
        id: 3,
        name: "Rahul",
        location: "Mogappair",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=15",
        service: "Battery Replacement",
        review:
            "Very fast battery replacement. The phone now lasts the whole day. Genuine parts and reasonable pricing."
    },
    {
        id: 4,
        name: "Mohammed",
        location: "Poonamallee",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=52",
        service: "Charging Port Repair",
        review:
            "The charging issue was fixed in less than one hour. Friendly staff and excellent workmanship."
    }
];

function Reviews() {

    return (

        <section className="reviews-section">

            <div className="reviews-header">

                <span>CUSTOMER REVIEWS</span>

                <h2>Trusted By Hundreds Of Customers</h2>

                <p>
                    Customer satisfaction is our biggest achievement.
                </p>

            </div>

            <Carousel>

                {reviews.map((review) => (

                    <div
                        className="review-card"
                        key={review.id}
                    >

                        <div className="review-top">

                            <img
                                src={review.image}
                                alt={review.name}
                            />

                            <div>

                                <h3>{review.name}</h3>

                                <span>
                                    {review.location}
                                </span>

                            </div>

                        </div>

                        <div className="review-stars">

                            {"★".repeat(review.rating)}

                        </div>

                        <h4>

                            {review.service}

                        </h4>

                        <p>

                            {review.review}

                        </p>

                    </div>

                ))}

            </Carousel>

        </section>

    );

}

export default Reviews;