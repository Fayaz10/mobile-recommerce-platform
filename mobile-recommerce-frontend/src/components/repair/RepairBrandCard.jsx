import React, { useState } from "react";

function RepairBrandCard({ brand, selected, onClick }) {

    const [imageError, setImageError] = useState(false);

    const showFallback = !brand.logo || imageError;

    return (

        <div
            className={`repair-brand-card ${selected ? "active" : ""}`}
            onClick={() => onClick(brand)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    onClick(brand);
                }
            }}
        >

            <div className="repair-brand-logo-wrapper">

                {showFallback ? (

                    <div className="repair-brand-logo-fallback">
                        {brand.name}
                    </div>

                ) : (

                    <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="repair-brand-logo"
                        onError={() => setImageError(true)}
                    />

                )}

            </div>

            <h3>{brand.name}</h3>

            {selected && (
                <div className="selected-badge">
                    ✓
                </div>
            )}

        </div>

    );
}

export default RepairBrandCard;