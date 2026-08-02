import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import RepairBrandSection from "../../components/repair/RepairBrandSection";
import "../../styles/repair/SelectBrand.css";

function SelectBrand() {
    return (
        <>
            <Navbar />

            <main className="repair-home">

                <section className="repair-page-header">

                    <div className="repair-container">

                        <h1>Book Mobile Repair</h1>

                        <p>
                            Select your mobile brand to begin your repair booking.
                        </p>

                    </div>

                </section>

                <RepairBrandSection />

            </main>

            <Footer />
        </>
    );
}

export default SelectBrand;