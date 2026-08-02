import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import ProductForm from "./ProductForm";

export default function ProductDrawer({

    open,

    onClose,

    onSave,

    product = null,

    submitting = false

}) {

    return (

        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >

            <Box
                sx={{
                    width: 520,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                <Box sx={{ p: 3 }}>

                    <Typography variant="h5">

                        {product
                            ? "Edit Product"
                            : "Add Product"}

                    </Typography>

                </Box>

                <Divider />

                <Box
                    sx={{
                        flex: 1,
                        overflow: "auto"
                    }}
                >

                    <ProductForm

                        initialData={product}

                        submitting={submitting}

                        onSubmit={onSave}

                    />

                </Box>

            </Box>

        </Drawer>

    );

}