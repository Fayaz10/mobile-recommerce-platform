import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField
} from "@mui/material";

function ProductFilters({

    filters,

    setFilters,

    brands = [],

    storages = [],

    rams = [],

    colors = [],

    conditions = [],

    onReset

}) {

    return (

        <Box
            sx={{
                p: 3,
                mb: 4,
                bgcolor: "#fff",
                borderRadius: 3,
                boxShadow: 2
            }}
        >

            <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 3 }}>

                    <TextField
                        fullWidth
                        label="Search"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                search: e.target.value
                            })
                        }
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>

                    <TextField
                        select
                        fullWidth
                        label="Brand"
                        value={filters.brand}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                brand: e.target.value
                            })
                        }
                    >

                        <MenuItem value="">
                            All Brands
                        </MenuItem>

                        {brands.map((brand) => (

                            <MenuItem
                                key={brand.id}
                                value={brand.id}
                            >
                                {brand.name}
                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>

                    <TextField
                        select
                        fullWidth
                        label="Storage"
                        value={filters.storage}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                storage: e.target.value
                            })
                        }
                    >

                        <MenuItem value="">
                            All
                        </MenuItem>

                        {storages.map((storage) => (

                            <MenuItem
                                key={storage}
                                value={storage}
                            >
                                {storage}
                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>

                    <TextField
                        select
                        fullWidth
                        label="RAM"
                        value={filters.ram}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                ram: e.target.value
                            })
                        }
                    >

                        <MenuItem value="">
                            All
                        </MenuItem>

                        {rams.map((ram) => (

                            <MenuItem
                                key={ram}
                                value={ram}
                            >
                                {ram}
                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>

                    <TextField
                        select
                        fullWidth
                        label="Condition"
                        value={filters.condition}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                condition: e.target.value
                            })
                        }
                    >

                        <MenuItem value="">
                            All
                        </MenuItem>

                        {conditions.map((condition) => (

                            <MenuItem
                                key={condition}
                                value={condition}
                            >
                                {condition}
                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

                <Grid
                    size={{ xs: 12, md: 1 }}
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={onReset}
                    >
                        Reset
                    </Button>

                </Grid>

            </Grid>

        </Box>

    );

}

export default ProductFilters;