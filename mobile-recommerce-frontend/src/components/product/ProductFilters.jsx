import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField
} from "@mui/material";

import "./ProductFilters.css";
import { FaSearch } from "react-icons/fa";

function ProductFilters({ filters, setFilters }) {

    return (

        <div className="product-filters">

            <div className="search-wrapper">

                <FaSearch className="search-icon" />

                <input
                    className="search-input"
                    type="text"
                    placeholder="Search mobiles by name..."
                    value={filters.search}
                    onChange={(e) =>
                        setFilters({
                            search: e.target.value
                        })
                    }
                />

            </div>

        </div>

    );

}

export default ProductFilters;