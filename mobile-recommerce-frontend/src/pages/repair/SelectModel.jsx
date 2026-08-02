import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { getSelectModel } from "../../services/api";
import "../../styles/repair/SelectModel.css";

function SelectModel() {

    const { brand } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const brandId = location.state?.brandId;

    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        async function loadModels() {

            try {

                const data = await getSelectModel(brandId);

                setModels(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        if (brandId) {
            loadModels();
        }

    }, [brandId]);

    const filteredModels = models.filter(model =>
        model.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="repair-container">
                    <h2>Loading Models...</h2>
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

                    <h1>
                        {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </h1>

                    <p>Select your device model</p>

                    <div className="repair-search-wrapper">

                        <input
                            type="text"
                            className="repair-search"
                            placeholder="Search model..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <p className="model-count">
                         {filteredModels.length} Models Available
                    </p>

                </div>

            </div>

            <section className="repair-brand-section">

                <div className="repair-container">

                    <div className="repair-model-grid">

                        {filteredModels.map((model) => (

                            <div
                                key={model.id}
                                className="repair-model-card"
                                onClick={() =>
                                    navigate(
                                        `/repair/${brand}/${encodeURIComponent(model.name)}`,
                                        {
                                            state: {
                                                brandId,
                                                modelId: model.id,
                                                modelName: model.name
                                            }
                                        }
                                    )
                                }
                            >
                                {model.name}
                            </div>

                        ))}

                    </div>

                </div>

            </section>

            <Footer />

        </div>

    );

}

export default SelectModel;