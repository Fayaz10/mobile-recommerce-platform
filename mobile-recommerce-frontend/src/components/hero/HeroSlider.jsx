import { useEffect, useState } from "react";
import "./HeroSlider.css";

import banner1 from "../../assets/hero/banner1.png";
import banner2 from "../../assets/hero/banner2.png";
import banner3 from "../../assets/hero/banner3.png";

const slides = [
    {
        image: banner1,
        subtitle: "PROFESSIONAL MOBILE REPAIR",
        title: "Expert Mobile Repair Services",
        description:
            "Fast, reliable and affordable repairs using genuine spare parts with service warranty.",
        button: "Book Repair",
        link: "/repair"
    },
    {
        image: banner2,
        subtitle: "CERTIFIED REFURBISHED PHONES",
        title: "Buy Premium Refurbished Mobiles",
        description:
            "Top quality iPhone, Samsung, OnePlus and more with warranty and affordable prices.",
        button: "Shop Now",
        link: "/refurbished"
    },
    {
        image: banner3,
        subtitle: "SPECIAL OFFERS",
        title: "Accessories & Exclusive Deals",
        description:
            "Chargers, Earbuds, Cases, Tempered Glass and exciting discounts every week.",
        button: "View Offers",
        link: "#accessories"
    }
];

function HeroSlider() {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentSlide(previous =>
                previous === slides.length - 1
                    ? 0
                    : previous + 1
            );

        }, 5000);

        return () => clearInterval(timer);

    }, []);

    function nextSlide() {

        setCurrentSlide(previous =>
            previous === slides.length - 1
                ? 0
                : previous + 1
        );

    }

    function previousSlide() {

        setCurrentSlide(previous =>
            previous === 0
                ? slides.length - 1
                : previous - 1
        );

    }

    return (

        <section className="hero-slider">

            {slides.map((slide, index) => (

                <div
                    key={index}
                    className={
                        index === currentSlide
                            ? "hero-slide active"
                            : "hero-slide"
                    }
                    style={{
                        backgroundImage: `url(${slide.image})`
                    }}
                >

                    <div className="hero-overlay"></div>

                    <div className="hero-content">

                        <span className="hero-subtitle">
                            {slide.subtitle}
                        </span>

                        <h1>
                            {slide.title}
                        </h1>

                        <p>
                            {slide.description}
                        </p>

                        <a
                            href={slide.link}
                            className="hero-button"
                        >
                            {slide.button}
                        </a>

                    </div>

                </div>

            ))}

            <button
                className="hero-arrow left"
                onClick={previousSlide}
            >
                ❮
            </button>

            <button
                className="hero-arrow right"
                onClick={nextSlide}
            >
                ❯
            </button>

            <div className="hero-dots">

                {slides.map((_, index) => (

                    <button
                        key={index}
                        className={
                            index === currentSlide
                                ? "hero-dot active"
                                : "hero-dot"
                        }
                        onClick={() => setCurrentSlide(index)}
                    />

                ))}

            </div>

        </section>

    );

}

export default HeroSlider;