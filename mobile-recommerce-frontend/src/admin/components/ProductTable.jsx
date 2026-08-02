import { DataGrid } from "@mui/x-data-grid";

import {
    Box,
    IconButton,
    Switch
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import ProductImage from "./ProductImage";
import ProductStatusChip from "./ProductStatusChip";

function ProductTable({

    products,

    onEdit,

    onStatusChange

}) {

    const columns = [

        {
            field: "image",
            headerName: "Image",
            width: 90,
            sortable: false,

            renderCell: (params) => (

                <ProductImage
                    imageUrl={params.row.imageUrl}
                    title={params.row.title}
                />

            )

        },

        {
            field: "title",
            headerName: "Product",
            flex: 1,
            minWidth: 220
        },

        {
            field: "sellingPrice",
            headerName: "Price",
            width: 120,

            renderCell: (params) => (
                <>₹{params.value}</>
            )

        },

        {
            field: "stockQuantity",
            headerName: "Stock",
            width: 100
        },

        {
            field: "active",
            headerName: "Status",
            width: 140,

            renderCell: (params) => (

                <ProductStatusChip
                    active={params.value}
                />

            )

        },

        {
            field: "toggle",
            headerName: "Enable",
            width: 120,

            sortable: false,

            renderCell: (params) => (

                <Switch

                    checked={params.row.active}

                    onChange={() =>
                        onStatusChange(params.row)
                    }

                />

            )

        },

        {
            field: "action",
            headerName: "Edit",
            width: 90,

            sortable: false,

            renderCell: (params) => (

                <IconButton

                    onClick={() =>
                        onEdit(params.row)
                    }

                >

                    <EditIcon />

                </IconButton>

            )

        }

    ];

    return (

        <Box
            sx={{
                height: 650,
                width: "100%"
            }}
        >

            <DataGrid

                rows={products}

                columns={columns}

                pageSizeOptions={[10, 20, 50,100]}

                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10
                        }
                    }
                }}

                disableRowSelectionOnClick

            />

        </Box>

    );

}

export default ProductTable;