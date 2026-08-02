import Chip from "@mui/material/Chip";

function ProductStatusChip({ active }) {

    return (
        <Chip
            label={active ? "Active" : "Inactive"}
            color={active ? "success" : "default"}
            size="small"
            variant={active ? "filled" : "outlined"}
        />
    );

}

export default ProductStatusChip;