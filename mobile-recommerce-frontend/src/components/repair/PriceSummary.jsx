function PriceSummary({
    selectedServices = [],
    total = 0,
    onContinue
}) {

    return (

        <aside className="price-summary">

            <div className="price-summary-header">

    <h2>Price Summary</h2>

    <span>
        {selectedServices.length} Service
        {selectedServices.length !== 1 ? "s" : ""}
    </span>

</div>

            <div className="summary-divider"></div>

            {selectedServices.length === 0 ? (

                <div className="summary-empty">

                    <p>No services selected</p>

                </div>

            ) : (

                <div className="summary-services">

                    {selectedServices.map((service) => (

                        <div
                            key={service.id}
                            className="summary-item"
                        >

                            <span>{service.problemName}</span>

                            <strong>₹{service.price}</strong>

                        </div>

                    ))}

                </div>

            )}

            <div className="summary-divider"></div>

            <div className="summary-total">

                <span>Total</span>

                <strong>₹{total}</strong>

            </div>

            <button
                className="summary-btn"
                onClick={onContinue}
                disabled={selectedServices.length === 0}
            >
                Continue Booking →
            </button>

        </aside>

    );

}

export default PriceSummary;