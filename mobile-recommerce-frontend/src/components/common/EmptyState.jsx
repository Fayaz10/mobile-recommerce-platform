import {
    Box,
    Button,
    Typography
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";

function EmptyState({

    title = "Nothing Found",

    message = "There is no data to display.",

    buttonText,

    onButtonClick

}) {

    return (

        <Box
            sx={{
                py: 8,
                px: 2,
                textAlign: "center"
            }}
        >

            <InboxIcon
                sx={{
                    fontSize: 90,
                    color: "#bdbdbd",
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
                sx={{
                    mb: 3
                }}
            >
                {message}
            </Typography>

            {buttonText && (

                <Button
                    variant="contained"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>

            )}

        </Box>

    );

}

export default EmptyState;