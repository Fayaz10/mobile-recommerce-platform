
import { useEffect, useState } from "react";


import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    MenuItem,
    Switch,
    FormControlLabel
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";

import screen from "../../assets/repair/screen.png";
import battery from "../../assets/repair/battery.png";
import water from "../../assets/repair/water.png";
import charging from "../../assets/repair/charging.png";
import camera from "../../assets/repair/camera.png";
import software from "../../assets/repair/software.png";

import {
    getBrands,
    getModelsByBrand,
    addRepairProblem,
    updateRepairProblem,
    getAllSelectRepair,
    uploadImage
} from "../../services/api";

const repairImages = {
    "Screen Replacement": screen,
    "Battery Replacement": battery,
    "Water Damage": water,
    "Charging Issues": charging,
    "Camera Repair": camera,
    "Software Repair": software
};


function AdminSelectRepair() {

    const [problems, setProblems] = useState([]);

    const [search, setSearch] = useState("");

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const [formData, setFormData] = useState({
    brandId: "",
    modelId: "",
    category: "",
    problemName: "",
    price: "",
    estimatedTime: "",
    imageUrl: "",
    description: "",
    active: true
    });

    const handleOpenDialog = () => {

        setIsEditMode(false);
        setEditingId(null);

    setFormData({
        brandId: "",
        modelId: "",
        category: "",
        problemName: "",
        price: "",
        estimatedTime: "",
        imageUrl: "",
        description: "",
        active: true
    });

    setOpenDialog(true);

    };

    const handleCloseDialog = () => {

         setOpenDialog(false);

    };

    const loadBrands = async () => {

    try {

        const data = await getBrands();

        setBrands(data);

    } catch (error) {

        console.error("Failed to load brands", error);

    }

};

const loadModels = async (brandId) => {

    try {

        const data = await getModelsByBrand(brandId);

        setModels(data);

        return data;

    } catch (error) {

        console.error(error);

        return [];

    }

};

const handleSave = async () => {

    try {

        if (isEditMode) {

            await updateRepairProblem(
                editingId,
                formData
            );

            alert("Repair Problem Updated Successfully!");

        } else {

            await addRepairProblem(formData);

            alert("Repair Problem Added Successfully!");

        }

        handleCloseDialog();

        loadProblems();

    } catch (error) {

        console.error(error);

        alert("Failed to save repair problem.");

    }

};

const handleEdit = async (problem) => {

    setIsEditMode(true);

    setEditingId(problem.id);

    // Load models for this brand FIRST
    await loadModels(problem.brandId);

    // Then set the form values
    setFormData({

        brandId: problem.brandId,
        modelId: problem.modelId,

        problemName: problem.problemName || "",
        category: problem.category || "",
        price: problem.price || "",
        estimatedTime: problem.estimatedTime || "",
        imageUrl: problem.imageUrl || "",
        description: problem.description || "",
        active: problem.active

    });

    if (problem.imageUrl) {

        setSelectedImage(
            `http://localhost:8080${problem.imageUrl}`
        );

    } else {

        setSelectedImage(null);

    }

    setOpenDialog(true);

};
    
const handleImageChange = async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));

    try {

        const result = await uploadImage(file);

        setFormData({

            ...formData,

            imageUrl: result.url

        });

    } catch (error) {

        console.error(error);

        alert("Image upload failed.");

    }

};

    useEffect(() => {

        loadProblems();
        loadBrands();

    }, []);

    async function loadProblems() {

        try {

            const data =
                await getAllSelectRepair();

            setProblems(data);

        } catch (error) {

            console.error(error);

        }

    }

    const filteredProblems =
        problems.filter(problem =>

            problem.problemName
                ?.toLowerCase()
                .includes(search.toLowerCase())

        );

        const columns = [

    {
    field: "imageUrl",
    headerName: "Image",
    width: 110,

    sortable: false,
    filterable: false,

    renderCell: (params) => {

        let image;

        if (params.row.imageUrl) {

            image = `http://localhost:8080${params.row.imageUrl}`;

        } else {

            image = repairImages[params.row.problemName];

        }

        return (

            <img
                src={image}
                alt={params.row.problemName}
                style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px"
                }}
                onError={(e) => {

                    e.target.src =
                        repairImages[params.row.problemName];

                }}
            />

        );

    }

},


    {
        field: "id",
        headerName: "ID",
        width: 70
    },

    {
        field: "problemName",
        headerName: "Problem",
        flex: 1
    },

    {
        field: "category",
        headerName: "Category",
        width: 150
    },

    {
        field: "price",
        headerName: "Price",
        width: 120,
        renderCell: (params) => `₹${params.value}`
    },

    {
        field: "estimatedTime",
        headerName: "Time",
        width: 120
    },

    {
        field: "active",
        headerName: "Status",
        width: 120,

        renderCell: (params) => (

            <span
                style={{
                    color: params.value ? "#16a34a" : "#dc2626",
                    fontWeight: 700
                }}
            >
                {params.value ? "Active" : "Inactive"}
            </span>

        )

    },

    {
    field: "actions",
    headerName: "Actions",
    width: 170,

    renderCell: (params) => (

        <>

            <Button
    variant="contained"
    size="small"
    onClick={() => handleEdit(params.row)}
>
    EDIT
</Button>

            <Button
                size="small"
                variant="contained"
                color="error"
            >
                Delete
            </Button>

        </>

    )

}

];

    return (

        <Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    {isEditMode ? "Edit Repair Problem" : "Add Repair Problem"}
                </Typography>

                <Button
                     variant="contained"
                     onClick={handleOpenDialog}
                >
                      + ADD REPAIR PROBLEM
                </Button>

            </Box>

            <TextField
                fullWidth
                placeholder="Search repair problem..."
                value={search}
                onChange={(e)=>
                    setSearch(e.target.value)
                }
                sx={{ mb:3 }}
            />

            <Paper
    sx={{
        height: 550,
        borderRadius: 3
    }}
>

    <DataGrid

        rows={filteredProblems}

        columns={columns}

        pageSizeOptions={[10,20,50,100]}

        initialState={{
            pagination:{
                paginationModel:{
                    pageSize:10
                }
            }
        }}

        disableRowSelectionOnClick

    />

            </Paper>

            <Dialog
    open={openDialog}
    onClose={handleCloseDialog}
    fullWidth
    maxWidth="md"
>

    <DialogTitle
        sx={{
            fontWeight: "bold",
            fontSize: 26
        }}
    >
        {isEditMode ? "Edit Repair Problem" : "Add Repair Problem"}
    </DialogTitle>

    <DialogContent>

        <Grid container spacing={3} sx={{ mt: 1 }}>

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
    select
    fullWidth
    label="Brand"

    value={formData.brandId}

    onChange={(e) => {

        const brandId = e.target.value;

        setFormData({

            ...formData,

            brandId: brandId,

            modelId: ""

        });

        loadModels(brandId);

    }}

>

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

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
    select
    fullWidth
    label="Device Model"

    value={formData.modelId}

    onChange={(e) =>

        setFormData({

            ...formData,

            modelId: e.target.value

        })

    }

>

    {models.map((model) => (

        <MenuItem
            key={model.id}
            value={model.id}
        >
            {model.name}
        </MenuItem>

    ))}

</TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
    select
    fullWidth
    label="Category"

    value={formData.category}

    onChange={(e) =>
        setFormData({
            ...formData,
            category: e.target.value
        })
    }
>

    <MenuItem value="Display">
        Display
    </MenuItem>

    <MenuItem value="Battery">
        Battery
    </MenuItem>

    <MenuItem value="Camera">
        Camera
    </MenuItem>

    <MenuItem value="Charging">
        Charging
    </MenuItem>

    <MenuItem value="Software">
        Software
    </MenuItem>

    <MenuItem value="Motherboard">
        Motherboard
    </MenuItem>

</TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
    fullWidth
    label="Problem Name"

    value={formData.problemName}

    onChange={(e) =>
        setFormData({
            ...formData,
            problemName: e.target.value
        })
    }
/>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
    fullWidth
    label="Price"
    type="number"

    value={formData.price}

    onChange={(e) =>
        setFormData({
            ...formData,
            price: e.target.value
        })
    }
/>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
    fullWidth
    label="Estimated Time"

    value={formData.estimatedTime}

    onChange={(e) =>
        setFormData({
            ...formData,
            estimatedTime: e.target.value
        })
    }
/>
            </Grid>

            <Grid size={12}>

    <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{
            height: 56,
            justifyContent: "flex-start"
        }}
    >
        Upload Repair Image

        <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
        />

    </Button>

    {selectedImage && (

        <Box
            sx={{
                mt: 2,
                textAlign: "center"
            }}
        >

            <img
                src={selectedImage}
                alt="Preview"
                style={{
                    width: 180,
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 12,
                    border: "1px solid #ddd"
                }}
            />

        </Box>

    )}

            </Grid>

           <Grid size={12}>
                <TextField
    fullWidth
    multiline
    rows={4}
    label="Description"

    value={formData.description}

    onChange={(e) =>
        setFormData({
            ...formData,
            description: e.target.value
        })
    }
/>
            </Grid>

             <Grid size={12}>
                <FormControlLabel
    control={
        <Switch
            checked={formData.active}
            onChange={(e) =>
                setFormData({
                    ...formData,
                    active: e.target.checked
                })
            }
        />
    }
    label="Active"
/>
            </Grid>

        </Grid>

    </DialogContent>

    <DialogActions>

        <Button
            onClick={handleCloseDialog}
        >
            Cancel
        </Button>

        <Button
            variant="contained"
            onClick={handleSave}
        >
            {isEditMode ? "UPDATE" : "SAVE"}
        </Button>

    </DialogActions>

</Dialog>

        </Box>

        

    );

}

export default AdminSelectRepair;