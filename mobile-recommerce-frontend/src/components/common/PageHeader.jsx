import { Stack, Typography } from "@mui/material";

function PageHeader({

    title,

    children

}) {

    return (

        <Stack
            direction="row"
            spacing={2}
            sx={{
                mb: 3,
                alignItems: "center"
            }}
        >

            <Typography
                variant="h4"
                sx={{
                    flexGrow: 1,
                    fontWeight: 600
                }}
            >
                {title}
            </Typography>

            {children}

        </Stack>

    );

}

export default PageHeader;