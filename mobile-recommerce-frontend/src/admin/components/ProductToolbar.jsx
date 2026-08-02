import {

    Box,

    Button,

    TextField,

    InputAdornment

} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import AddIcon from "@mui/icons-material/Add";

function ProductToolbar({

    search,

    setSearch,

    onAdd

}) {

    return (

        <Box

            sx={{

                display: "flex",

                justifyContent: "space-between",

                mb: 3,

                gap: 2,

                flexWrap: "wrap"

            }}

        >

            <TextField

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

                placeholder="Search products..."

                size="small"

                sx={{

                    width: 350

                }}

                InputProps={{

                    startAdornment: (

                        <InputAdornment position="start">

                            <SearchIcon />

                        </InputAdornment>

                    )

                }}

            />

            <Button

                variant="contained"

                startIcon={<AddIcon />}

                onClick={onAdd}

            >

                Add Product

            </Button>

        </Box>

    );

}

export default ProductToolbar;