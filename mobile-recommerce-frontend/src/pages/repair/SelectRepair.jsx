import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import ProblemCard from "../../components/repair/ProblemCard";
import PriceSummary from "../../components/repair/PriceSummary";
import LoginModel from "../../components/auth/LoginModel";
import { useEffect, useState } from "react";
import { getSelectRepair } from "../../services/api";

function SelectRepair() {

    const { brand, model } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const {
        brandId,
        modelId,
        modelName
    } = location.state || {};

    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showLogin, setShowLogin] = useState(false);
    const [pendingService, setPendingService] = useState(null);

    useEffect(() => {

        async function loadProblems() {

            try {

                const data = await getSelectRepair(modelId);

                setServices(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        if (modelId) {
            loadProblems();
        }

    }, [modelId]);

    const handleAddService = (service) => {

        const token = localStorage.getItem("token");

        if (!token) {

            setPendingService(service);
            setShowLogin(true);
            return;

        }

        const exists = selectedServices.find(
            item => item.id === service.id
        );

        if (exists) {

            setSelectedServices(
                selectedServices.filter(
                    item => item.id !== service.id
                )
            );

        } else {

            setSelectedServices([
                ...selectedServices,
                service
            ]);

        }

    };

    const total = selectedServices.reduce(
        (sum, service) => sum + Number(service.price),
        0
    );

    const handleContinueBooking = () => {

         console.log("Continue clicked");

    console.log({
        brand,
        brandId,
        modelId,
        modelName,
        selectedServices,
        total
    });

        if (selectedServices.length === 0) {

            alert("Please select at least one repair service.");
            return;

        }

        console.log("Navigating to /repair/booking");

        navigate("/repair/booking", {

            state: {

                brand,
                brandId,
                modelId,
                modelName,
                selectedServices,
                total

            }

        });

    };

    if (loading) {

        return (
            <>
                <Navbar />
                <div className="repair-container">
                    <h2>Loading Repair Services...</h2>
                </div>
                <Footer />
            </>
        );

    }

    return (

        <div className="repair-home">

            <Navbar />

            <div className="repair-page-header">

                <div className="repair-container">

                    <h1>{decodeURIComponent(model)}</h1>

                    <p>Select the repair service you need</p>

                </div>

            </div>

            <section className="repair-services-section">

                <div className="repair-container">

                    <div className="repair-layout">

                        <div>

                            <h2 className="repair-section-title">

                                Choose Your Repair Service

                            </h2>

                            <div className="repair-services-grid">

                                {services.map(service => (

                                    <ProblemCard

                                        key={service.id}

                                        service={service}

                                        onAdd={handleAddService}

                                        selected={selectedServices.some(
                                            item => item.id === service.id
                                        )}

                                    />

                                ))}

                            </div>

                        </div>

                        <PriceSummary

                            selectedServices={selectedServices}

                            total={total}

                            onContinue={handleContinueBooking}

                        />

                    </div>

                </div>

            </section>

            {showLogin && (

                <LoginModel

                    onClose={() => setShowLogin(false)}

                    onSuccess={() => {

                        setShowLogin(false);

                        if (pendingService) {

                            handleAddService(pendingService);

                            setPendingService(null);

                        }

                    }}

                />

            )}

            <Footer />

        </div>

    );

}

export default SelectRepair;