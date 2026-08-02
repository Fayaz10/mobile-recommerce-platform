import { useEffect, useState } from "react";

import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";

import {
    getBrands,
    getModelsByBrand,
    getVariantsByModel
} from "../../services/api";

export default function ProductForm({

    initialData = null,

    onSubmit,

    submitting = false

}) {

    const [brands, setBrands] = useState([]);

    const [models, setModels] = useState([]);

    const [variants, setVariants] = useState([]);

    const [loadingBrands, setLoadingBrands] = useState(true);

    const [form, setForm] = useState({

        brandId: "",

        modelId: "",

        variantId: "",

        title: "",

        color: "",

        conditionType: "",

        originalPrice: "",

        sellingPrice: "",

        stockQuantity: "",

        warranty: "",

        description: "",

        active: true

    });

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {

    loadBrands();

}, []);

useEffect(() => {

    if (!initialData) return;

    setForm({

        brandId: initialData.brandId || "",

        modelId: initialData.modelId || "",

        variantId: initialData.variantId || "",

        title: initialData.title || "",

        color: initialData.color || "",

        conditionType: initialData.conditionType || "",

        originalPrice: initialData.originalPrice || "",

        sellingPrice: initialData.sellingPrice || "",

        stockQuantity: initialData.stockQuantity || "",

        warranty: initialData.warranty || "",

        description: initialData.description || "",

        active: initialData.active ?? true

    });

}, [initialData]);

async function loadBrands() {

    try {

        const data = await getBrands();

        setBrands(data);

    } finally {

        setLoadingBrands(false);

    }

}

function handleChange(e) {

    const { name, value } = e.target;

    if (name === "brandId") {

        setForm(prev => ({
            ...prev,
            brandId: value,
            modelId: "",
            variantId: ""
        }));

        return;
    }

    if (name === "modelId") {

        setForm(prev => ({
            ...prev,
            modelId: value,
            variantId: ""
        }));

        return;
    }

    setForm(prev => ({
        ...prev,
        [name]: value
    }));
}

useEffect(() => {

    if (!form.brandId) return;

    loadModels(form.brandId);

}, [form.brandId]);

async function loadModels(id) {

    const data = await getModelsByBrand(id);

    setModels(data);

}

useEffect(() => {

    if (!form.modelId) return;

    loadVariants(form.modelId);

}, [form.modelId]);

async function loadVariants(id) {

    const data = await getVariantsByModel(id);

    setVariants(data);

}

function handleImage(e) {

    if (e.target.files.length === 0) return;

    setImageFile(e.target.files[0]);

}

function submit(e) {

    e.preventDefault();

    onSubmit(form, imageFile);

}

return (

    <form onSubmit={submit}>

<Box>
    
    <Grid container spacing={3}>

    <Grid item xs={12} md={6}>

        <FormControl fullWidth>

            <InputLabel>Brand</InputLabel>

            <Select
                name="brandId"
                label="Brand"
                value={form.brandId}
                onChange={handleChange}
            >
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

    </Grid>

    <Grid item xs={12} md={6}>

        <FormControl fullWidth>

            <InputLabel>Model</InputLabel>

            <Select
                name="modelId"
                label="Model"
                value={form.modelId}
                onChange={handleChange}
            >
                {models.map((model) => (
                    <MenuItem
                        key={model.id}
                        value={model.id}
                    >
                        {model.name}
                    </MenuItem>
                ))}
            </Select>

        </FormControl>

    </Grid>

    <Grid item xs={12}>

        <FormControl fullWidth>

            <InputLabel>Variant</InputLabel>

            <Select
                name="variantId"
                label="Variant"
                value={form.variantId}
                onChange={handleChange}
            >
                {variants.map((variant) => (
                    <MenuItem
                        key={variant.id}
                        value={variant.id}
                    >
                        {variant.ram} GB / {variant.storage} GB
                    </MenuItem>
                ))}
            </Select>

        </FormControl>

    </Grid>

    <Grid item xs={12}>

        <TextField
            fullWidth
            name="title"
            label="Product Title"
            value={form.title}
            onChange={handleChange}
        />

    </Grid>

    <Grid item xs={12} md={6}>

        <TextField
            fullWidth
            name="color"
            label="Color"
            value={form.color}
            onChange={handleChange}
        />

    </Grid>

    <Grid item xs={12} md={6}>

        <FormControl fullWidth>

    <InputLabel>Condition</InputLabel>

    <Select
        name="conditionType"
        label="Condition"
        value={form.conditionType}
        onChange={handleChange}
    >
        <MenuItem value="Excellent">
            Excellent
        </MenuItem>

        <MenuItem value="Good">
            Good
        </MenuItem>

        <MenuItem value="Fair">
            Fair
        </MenuItem>
    </Select>

</FormControl>

    </Grid>

    <Grid item xs={12} md={6}>

    <TextField
        fullWidth
        required
        type="number"
        name="originalPrice"
        label="Original Price"
        value={form.originalPrice}
        onChange={handleChange}
    />

</Grid>

<Grid item xs={12} md={6}>

    <TextField
        fullWidth
        required
        type="number"
        name="sellingPrice"
        label="Selling Price"
        value={form.sellingPrice}
        onChange={handleChange}
    />

</Grid>

<Grid item xs={12} md={6}>

    <TextField
        fullWidth
        required
        type="number"
        name="stockQuantity"
        label="Stock Quantity"
        value={form.stockQuantity}
        onChange={handleChange}
    />

</Grid>

<Grid item xs={12} md={6}>

    <TextField
        fullWidth
        name="warranty"
        label="Warranty"
        placeholder="6 Months"
        value={form.warranty}
        onChange={handleChange}
    />

</Grid>

<Grid item xs={12}>

    <TextField
        fullWidth
        multiline
        rows={4}
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
        placeholder="Enter product description..."
    />

</Grid>

<Grid item xs={12}>

    <Button
        variant="outlined"
        component="label"
        fullWidth
    >
        Upload Product Image

        <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImage}
        />

    </Button>

    {imageFile && (
    <>
        <Box
            component="img"
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            sx={{
                width: 180,
                height: 180,
                objectFit: "contain",
                mt: 2,
                border: "1px solid #ddd",
                borderRadius: 2
            }}
        />

        <Typography sx={{ mt: 1 }}>
            {imageFile.name}
        </Typography>
    </>
)}

</Grid>

<Grid item xs={12}>

    <FormControlLabel
        control={
            <Switch
                checked={form.active}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        active: e.target.checked
                    }))
                }
            />
        }
        label="Active Product"
    />

</Grid>

</Grid>

<Stack
    direction="row"
    justifyContent="flex-end"
    mt={3}
>

    <Button
        type="submit"
        variant="contained"
        disabled={submitting}
    >
        {submitting ? (
            <CircularProgress size={22} />
        ) : (
            "Save Product"
        )}
    </Button>

</Stack>

</Box>
</form>
);
}