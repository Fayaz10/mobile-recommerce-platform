import "../../styles/repair/ProblemCard.css";

function ProblemCard({ service, onAdd, selected }) {

    return (

        <div className="problem-card">

            <div className="problem-icon">
                📱
            </div>

            <div className="problem-content">

                <h3>{service.problemName}</h3>

                <p className="problem-description">
                    {service.description}
                </p>

                <div className="problem-price">

                    <span className="current-price">
                        ₹{service.price}
                    </span>

                </div>

                <div className="problem-meta">

                    <span>✓ Genuine Parts</span>

                    <span>✓ {service.estimatedTime}</span>

                </div>

            </div>

            <button
                className={`problem-add-btn ${selected ? "selected" : ""}`}
                onClick={() => onAdd(service)}
            >
                {selected ? "✓" : "+"}
            </button>

        </div>

    );

}

export default ProblemCard;