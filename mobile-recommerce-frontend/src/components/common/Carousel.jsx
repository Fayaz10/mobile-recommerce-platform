import { useRef } from "react";
import "./Carousel.css";

function Carousel({ children }) {

    const sliderRef = useRef(null);

    function scrollLeft() {

        sliderRef.current.scrollBy({

            left: -320,

            behavior: "smooth"

        });

    }

    function scrollRight() {

        sliderRef.current.scrollBy({

            left: 320,

            behavior: "smooth"

        });

    }

    return (

        <div className="carousel-wrapper">

            <button
                className="carousel-arrow left"
                onClick={scrollLeft}
            >
                ❮
            </button>

            <div
                className="carousel-container"
                ref={sliderRef}
            >

                {children}

            </div>

            <button
                className="carousel-arrow right"
                onClick={scrollRight}
            >
                ❯
            </button>

        </div>

    );

}

export default Carousel;