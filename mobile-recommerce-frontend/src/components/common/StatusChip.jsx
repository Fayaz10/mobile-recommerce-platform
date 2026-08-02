import Chip from "@mui/material/Chip";

function StatusChip({ status }) {

    const value = String(status).toUpperCase();

    let color = "default";

    switch (value) {

        case "ACTIVE":
        case "AVAILABLE":
        case "COMPLETED":
        case "DELIVERED":
            color = "success";
            break;

        case "PENDING":
        case "PROCESSING":
            color = "warning";
            break;

        case "INACTIVE":
        case "CANCELLED":
        case "REJECTED":
            color = "error";
            break;

        default:
            color = "info";
    }

    return (

        <Chip
            label={status}
            color={color}
            size="small"
            sx={{
                fontWeight: 600,
                borderRadius: "8px",
                minWidth: 90
            }}
        />

    );

}

export default StatusChip;