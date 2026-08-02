import {
    Box,
    Button,
    Typography
} from "@mui/material";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

function ErrorState({

    title = "Something went wrong",

    message = "Please try again.",

    onRetry

}) {

    return (

        <Box
            sx={{
                py: 8,
                px: 2,
                textAlign: "center"
            }}
        >

            <ErrorOutlineRoundIcon
                sx={{
                    fontSize: 90,
                    color: "#f44336",
                    mb: 2
                }}
            />

            <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
            >
                {title}
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                {message}
            </Typography>

            {onRetry && (

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#ff6b00",
                        "&:hover": {
                            bgcolor: "#e55d00"
                        }
                    }}
                    onClick={onRetry}
                >
                    Retry
                </Button>

            )}

        </Box>

    );

}

export default ErrorState;