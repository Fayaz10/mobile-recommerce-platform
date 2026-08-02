import { useEffect, useMemo, useState } from "react";

import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    DataGrid
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    getBrands,
    getDeviceModels,
    addDeviceModel,
    updateDeviceModel,
    deleteDeviceModel
} from "../../services/api";

import DeviceModelDialog
    from "../dialogs/DeviceModelDialog";

export default function AdminDeviceModels() {

    const [loading, setLoading] = useState(true);

const [brands, setBrands] = useState([]);

const [models, setModels] = useState([]);

const [search, setSearch] = useState("");

const [brandFilter, setBrandFilter] = useState("");

const [dialogOpen, setDialogOpen] = useState(false);

const emptyModel = {

    id: null,

    name: "",

    imageUrl: "",

    displayOrder: 0,

    active: true,

    brand: {
        id: ""
    }

};

const [selectedModel, setSelectedModel] =
    useState(emptyModel);

   useEffect(() => {

    loadData();

}, []);

async function loadData() {

    try {

        setLoading(true);

        const [brandData, modelData] =
            await Promise.all([
                getBrands(),
                getDeviceModels()
            ]);

        setBrands(brandData);

        setModels(modelData);

    } catch (err) {

        console.error(err);

    } finally {

        setLoading(false);

    }

}

    const filteredModels = useMemo(() => {

    return models.filter((model) => {

        const matchesSearch =
            model.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                );

        const matchesBrand =

            !brandFilter ||

            String(model.brand?.id) ===
            String(brandFilter);

        return matchesSearch &&
               matchesBrand;

    });

}, [
    models,
    search,
    brandFilter
]);

function handleAdd() {

    setSelectedModel(emptyModel);

    setDialogOpen(true);

}

function handleEdit(model) {

    setSelectedModel(model);

    setDialogOpen(true);

}

async function handleSave() {

    try {

        if (!selectedModel.brand.id) {

            alert("Please select a brand.");

            return;

        }

        if (!selectedModel.name.trim()) {

            alert("Please enter a model name.");

            return;

        }

        if (selectedModel.id) {

            await updateDeviceModel(
                selectedModel.id,
                selectedModel
            );

        } else {

            await addDeviceModel(
                selectedModel.brand.id,
                selectedModel
            );

        }

        setDialogOpen(false);

        await loadData();

    } catch (err) {

        alert(err.message);

    }

}

async function handleDelete(id) {

    const confirmed = window.confirm(
        "Delete this device model?"
    );

    if (!confirmed) return;

    try {

        await deleteDeviceModel(id);

        await loadData();

    } catch (err) {

        alert(err.message);

    }

}

const columns = [

    {
        field: "image",
        headerName: "Image",
        width: 110,

        renderCell: (params) => (

            <img
                src={
                    params.row.imageUrl ||
                    "/placeholder-phone.png"
                }
                alt=""
                style={{
                    width: 55,
                    height: 55,
                    objectFit: "contain"
                }}
            />

        )

    },

    {
        field: "name",
        headerName: "Model",
        flex: 1
    },

    {
        field: "brand",
        headerName: "Brand",
        flex: 1,

        valueGetter: (_, row) =>
            row.brand?.name || ""
    },

    {
        field: "active",
        headerName: "Status",
        width: 120,

        renderCell: (params) =>
            params.value
                ? "Active"
                : "Inactive"
    },

    {
        field: "actions",
        headerName: "Actions",
        width: 140,

        sortable: false,

        renderCell: (params) => (

            <>

                <IconButton
                    color="primary"
                    onClick={() =>
                        handleEdit(params.row)
                    }
                >

                    <EditIcon />

                </IconButton>

                <IconButton
                    color="error"
                    onClick={() =>
                        handleDelete(params.row.id)
                    }
                >

                    <DeleteIcon />

                </IconButton>

            </>

        )

    }

];

    return (

        <Box sx={{ p: 3 }}>

            <Typography
                variant="h4"
                mb={3}
            >
                Device Models
            </Typography>

            <Box
                display="flex"
                gap={2}
                mb={3}
            >

                <TextField
                    label="Search Model"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                <FormControl
                    sx={{ minWidth: 220 }}
                >

                    <InputLabel>
                        Brand
                    </InputLabel>

                    <Select
                        value={brandFilter}
                        label="Brand"
                        onChange={(e) =>
                            setBrandFilter(
                                e.target.value
                            )
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

                    </Select>

                </FormControl>

                <Box sx={{ flexGrow: 1 }} />

                <Button
                    variant="contained"
                    onClick={handleAdd}
                >
                    Add Model
                </Button>

            </Box>

            <DataGrid
                autoHeight
                loading={loading}
                rows={filteredModels}
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

            <DeviceModelDialog
    open={dialogOpen}
    onClose={() => setDialogOpen(false)}
    onSave={handleSave}
    model={selectedModel}
    setModel={setSelectedModel}
    brands={brands}
/>

        </Box>

    );

}