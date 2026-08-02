import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../common/Carousel";
import "./HotDeals.css";

import iphone13 from "../../assets/products/iphone13.png";
import s22 from "../../assets/products/s22.png";
import oneplus11r from "../../assets/products/oneplus11r.png";

function HotDeals() {

    const calculateTime = () => {

        const target = new Date();

        target.setHours(23, 59, 59, 999);

        const difference = target - new Date();

        return {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTime());

    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft(calculateTime());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const deals = [

    {
        id: 1,
        brand: "Apple",
        name: "iPhone 13 128GB",
        image: iphone13,
        discount: "20%",
        price: "₹34,999",
        oldPrice: "₹43,999",
        rating: 4.8,
        reviews: 245
    },

    {
        id: 2,
        brand: "Samsung",
        name: "Galaxy S22 128GB",
        image: s22,
        discount: "18%",
        price: "₹31,999",
        oldPrice: "₹38,999",
        rating: 4.7,
        reviews: 196
    },

    {
        id: 3,
        brand: "OnePlus",
        name: "OnePlus 11R",
        image: oneplus11r,
        discount: "15%",
        price: "₹28,999",
        oldPrice: "₹33,999",
        rating: 4.6,
        reviews: 181
    }

    ];

    return (

        <section className="hot-deals">

            <div className="deals-header">

                <div>

                    <span>LIMITED TIME OFFER</span>

                    <h2>Today's Hot Deals</h2>

                    <p>
                        Grab these amazing refurbished mobile deals before the timer ends.
                    </p>

                </div>

                <div className="countdown">

                    <div>
                        <h3>{timeLeft.hours}</h3>
                        <small>Hours</small>
                    </div>

                    <div>
                        <h3>{timeLeft.minutes}</h3>
                        <small>Minutes</small>
                    </div>

                    <div>
                        <h3>{timeLeft.seconds}</h3>
                        <small>Seconds</small>
                    </div>

                </div>

            </div>
            

            <div className="deal-grid">

                <Carousel>

                {deals.map(deal => (

                    <div
                        key={deal.id}
                        className="deal-card"
                    >

                        <div className="discount">

                            {deal.discount} OFF

                        </div>

                        <div className="deal-image">

    <img
        src={deal.image}
        alt={deal.name}
    />

</div>

<div className="deal-brand">

    {deal.brand}

</div>

<h3>

    {deal.name}

</h3>

<div className="deal-rating">

    ⭐ {deal.rating}

    <span>

        ({deal.reviews} Reviews)

    </span>

</div>

<div className="price">

                            <span className="new-price">
                                {deal.price}
                            </span>

                            <span className="old-price">
                                {deal.oldPrice}
                            </span>

                        </div>

                        <Link
                            to="/refurbished"
                            className="deal-button"
                        >
                            Shop Now
                        </Link>

                    </div>

                ))}

                </Carousel>

            </div>

        </section>

    );

}

export default HotDeals;