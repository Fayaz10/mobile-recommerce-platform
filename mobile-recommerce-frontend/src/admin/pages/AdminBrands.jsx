import { useEffect, useState } from "react";
const logoModules = import.meta.glob(
    "../../assets/brands/*.svg",
    {
        eager: true,
        import: "default"
    }
);

const brandLogos = {};

Object.entries(logoModules).forEach(([path, module]) => {
    const fileName = path
        .split("/")
        .pop()
        .replace(".svg", "");

    brandLogos[fileName] = module;
});


import {
    Box,
    Button,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
    getBrands,
    addBrand,
    updateBrand,
    deleteBrand
} from "../../services/api";

export default function AdminBrands() {

    const [brands, setBrands] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

        useEffect(() => {

        loadBrands();

    }, []);

    async function loadBrands() {

        try {

            setLoading(true);

            const data = await getBrands();

            setBrands(data);

        } finally {

            setLoading(false);

        }

    }

        async function handleDelete(id) {

        if (!window.confirm("Delete this brand?")) return;

        await deleteBrand(id);

        loadBrands();

    }

        async function toggleBrand(brand) {

        await updateBrand(brand.id, {

            ...brand,

            active: !brand.active

        });

        loadBrands();

    }

    const columns = [

    {
        field: "id",
        headerName: "ID",
        width: 80
    },

    {
        field: "name",
        headerName: "Brand",
        flex: 1
    },

    {
    field: "logo",
    headerName: "Logo",
    width: 100,

    renderCell: (params) => {

        const logo =
            brandLogos[
                params.row.name.toLowerCase()
            ];

        return (
            <img
                src={logo}
                alt={params.row.name}
                width={42}
                height={42}
                style={{
                    objectFit: "contain"
                }}
            />
        );
    }
},

    {
        field: "displayOrder",
        headerName: "Order",
        width: 100
    },

    {
        field: "active",
        headerName: "Active",
        width: 120,

        renderCell: (params)=>(

            <Switch

                checked={params.row.active}

                onChange={()=>
                    toggleBrand(params.row)
                }

            />

        )

    },

    {

        field:"delete",

        headerName:"",

        width:120,

        renderCell:(params)=>(

            <Button

                color="error"

                onClick={()=>
                    handleDelete(params.row.id)
                }

            >

                Delete

            </Button>

        )

    }

];

return (

<Box p={3}>

<Typography
variant="h4"
mb={3}
>

Brands

</Typography>

<Stack
direction="row"
spacing={2}
mb={2}
>

<TextField

label="Search"

value={search || ""}

onChange={(e)=>
setSearch(e.target.value)
}

/>

<Button
variant="contained"
>

Add Brand

</Button>

</Stack>

<Paper>

<DataGrid
    rows={brands.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
    )}
    columns={columns}
    loading={loading}
    autoHeight
    initialState={{
        pagination: {
            paginationModel: {
                pageSize: 10,
                page: 0
            }
        }
    }}
    pageSizeOptions={[10, 20,50,100]}
/>

</Paper>

</Box>

);

}