import { useEffect, useMemo, useState } from "react";

import {
    Box,
    Button,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    DataGrid
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import IconButton from "@mui/material/IconButton";

import {
    getBrands,
    getDeviceModels,
    getDeviceVariants,
    addDeviceVariant,
    updateDeviceVariant,
    deleteDeviceVariant
} from "../../services/api";

import DeviceVariantDialog
    from "../dialogs/DeviceVariantDialog";

import ConfirmDialog
from "../../components/common/ConfirmDialog";

import PageHeader from "../../components/common/PageHeader";

import StatusChip
from "../../components/common/StatusChip";

export default function AdminDeviceVariants() {

    const [confirmOpen, setConfirmOpen] = useState(false);

const [deleteId, setDeleteId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [brands, setBrands] = useState([]);

    const [models, setModels] = useState([]);

    const [variants, setVariants] = useState([]);

    const [search, setSearch] = useState("");

    const [brandFilter, setBrandFilter] = useState("");

    const [modelFilter, setModelFilter] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedVariant, setSelectedVariant] =
        useState(null);

    const filteredVariants = useMemo(() => {

    return variants.filter((variant) => {

        const brandName =
            variant.deviceModel?.brand?.name ?? "";

        const modelName =
            variant.deviceModel?.name ?? "";

        const ram =
            variant.ram ?? "";

        const storage =
            variant.storage ?? "";

        const matchesSearch =
            brandName.toLowerCase().includes(search.toLowerCase()) ||

            modelName.toLowerCase().includes(search.toLowerCase()) ||

            ram.toLowerCase().includes(search.toLowerCase()) ||

            storage.toLowerCase().includes(search.toLowerCase());

        const matchesBrand =
            !brandFilter ||

            variant.deviceModel?.brand?.id === brandFilter;

        const matchesModel =
            !modelFilter ||

            variant.deviceModel?.id === modelFilter;

        return matchesSearch &&
               matchesBrand &&
               matchesModel;

    });

}, [
    variants,
    search,
    brandFilter,
    modelFilter
]);    

    const loadData = async () => {

    setLoading(true);

    try {

        const [
            brandsRes,
            modelsRes,
            variantsRes
        ] = await Promise.all([

            getBrands(),

            getDeviceModels(),

            getDeviceVariants()

        ]);

        setBrands(brandsRes);

setModels(modelsRes);

setVariants(variantsRes);

    } finally {

        setLoading(false);

    }

};

const handleAdd = () => {

    setSelectedVariant({
        deviceModel: null,
        ram: "",
        storage: "",
        color: "",
        basePrice: "",
        displayOrder: 0,
        active: true
    });

    setDialogOpen(true);

};

const handleEdit = (variant) => {

    setSelectedVariant({ ...variant });

    setDialogOpen(true);

};

const handleSave = async () => {

    if (!selectedVariant?.deviceModel?.id) {

        alert("Please select a device model.");

        return;

    }

    try {

        if (selectedVariant.id) {

            await updateDeviceVariant(
                selectedVariant.id,
                selectedVariant
            );

        } else {

            await addDeviceVariant(
                selectedVariant.deviceModel.id,
                selectedVariant
            );

        }

        setDialogOpen(false);

        await loadData();

    } catch (err) {

        alert(err.message);

    }

};

const handleDelete = (id) => {

    setDeleteId(id);

    setConfirmOpen(true);

};

const confirmDelete = async () => {

    try {

        await deleteDeviceVariant(deleteId);

        await loadData();

    } catch (err) {

        alert(err.message);

    } finally {

        setConfirmOpen(false);

        setDeleteId(null);

    }

};

useEffect(() => {

    loadData();

}, []);

const columns = [

    {
        field: "brand",
        headerName: "Brand",
        flex: 1,
        valueGetter: (_, row) =>
            row.deviceModel?.brand?.name
    },

    {
        field: "model",
        headerName: "Model",
        flex: 1,
        valueGetter: (_, row) =>
            row.deviceModel?.name
    },

    {
        field: "storage",
        headerName: "Storage",
        flex: 1
    },

    {
        field: "ram",
        headerName: "RAM",
        flex: 1
    },

    {
        field: "color",
        headerName: "Color",
        flex: 1
    },

    {
        field: "basePrice",
        headerName: "Base Price",
        flex: 1
    },

    {
        field: "active",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => (

    <StatusChip
        status={
            params.value
                ? "Active"
                : "Inactive"
        }
    />

)
    },

    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        flex: 1,
        renderCell: (params) => (
            <>
                <IconButton
    color="primary"
    onClick={() => handleEdit(params.row)}
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

<Paper sx={{ p: 3 }}>

<PageHeader title="Device Variants">

    <TextField
        size="small"
        label="Search"
        value={search}
        onChange={(e) =>
            setSearch(e.target.value)
        }
    />

    <TextField
        select
        size="small"
        label="Brand"
        value={brandFilter}
        onChange={(e) =>
            setBrandFilter(e.target.value)
        }
        sx={{ width: 180 }}
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

    <TextField
        select
        size="small"
        label="Model"
        value={modelFilter}
        onChange={(e) =>
            setModelFilter(e.target.value)
        }
        sx={{ width: 220 }}
    >

        <MenuItem value="">
            All Models
        </MenuItem>

        {models
            .filter(model =>
                !brandFilter ||
                model.brand?.id === brandFilter
            )
            .map(model => (

                <MenuItem
                    key={model.id}
                    value={model.id}
                >
                    {model.name}
                </MenuItem>

            ))}

    </TextField>

    <Button
        variant="contained"
        onClick={handleAdd}
    >
        Add Variant
    </Button>

</PageHeader>

    <Box sx={{ height: 600 }}>

        <DataGrid
            rows={filteredVariants}
            columns={columns}
            loading={loading}
            pageSizeOptions={[10, 20, 50,100]}
        />

    </Box>

    <DeviceVariantDialog
        open={dialogOpen}
        onClose={() =>
            setDialogOpen(false)
        }
        onSave={handleSave}
        variant={selectedVariant}
        setVariant={setSelectedVariant}
        brands={brands}
        models={models}
    />

<ConfirmDialog

    open={confirmOpen}

    title="Delete Device Variant"

    message="Are you sure you want to delete this device variant? This action cannot be undone."

    confirmText="Yes,Delete"

    cancelText="Cancel"

    onConfirm={confirmDelete}

    onCancel={() => {

        setConfirmOpen(false);

        setDeleteId(null);

    }}

/>

</Paper>

);

}