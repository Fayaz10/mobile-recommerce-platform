import {
    Box,
    CircularProgress,
    Typography
} from "@mui/material";

function LoadingSpinner({

    text = "Loading..."

}) {

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8
            }}
        >

            <CircularProgress
                size={60}
                sx={{
                    color: "#ff6b00"
                }}
            />

            <Typography
                sx={{
                    mt: 2,
                    color: "text.secondary",
                    fontWeight: 500
                }}
            >
                {text}
            </Typography>

        </Box>

    );

}

export default LoadingSpinner;