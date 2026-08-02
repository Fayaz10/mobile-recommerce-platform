import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    addProduct,
    updateProduct,
    uploadProductImage,
    getBrands,
    getModelsByBrand,
    getVariantsByModel,
    getProductById
} from "../../services/api";

import "./AdminProductForm.css";

function AdminProductForm() {


    const [form, setForm] = useState({

        title: "",

        brandId: "",

        modelId: "",

        variantId: "",

        color: "",

        conditionType: "LIKE_NEW",

        originalPrice: "",

        sellingPrice: "",

        stockQuantity: "",

        warranty: "",

        description: ""

    });

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [variants, setVariants] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [imageFile, setImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    useEffect(() => {

       loadBrands();

    }, []);

    useEffect(() => {

    if (isEditMode) {

        loadProductForEdit();

        }

    }, [id]);

   async function loadProductForEdit() {

    try {

        const product =
            await getProductById(id);

            setCurrentImageUrl(
    product.imageUrl || ""
);

        const brandId =
            product.deviceVariant.deviceModel.brand.id;

        const modelId =
            product.deviceVariant.deviceModel.id;

        // Load dropdowns first
        const modelList =
            await getModelsByBrand(brandId);

        setModels(modelList);

        const variantList =
            await getVariantsByModel(modelId);

        setVariants(variantList);

        // Populate form
        setForm({

            title: product.title,

            brandId: String(brandId),

            modelId: String(modelId),

            variantId: String(product.deviceVariant.id),

            color: product.color,

            conditionType: product.conditionType,

            originalPrice: product.originalPrice,

            sellingPrice: product.sellingPrice,

            stockQuantity: product.stockQuantity,

            warranty: product.warranty,

            description: product.description

        });

    }
    catch (error) {

        alert(error.message);

    }

}


    async function loadBrands() {

    try {

        const data = await getBrands();

        setBrands(data);

    }
    catch (error) {

        alert(error.message);

    }

}

async function loadModels(brandId) {

    if (!brandId) {

        setModels([]);

        return;

    }

    try {

        const data =
            await getModelsByBrand(brandId);

        setModels(data);

    }
    catch (error) {

        alert(error.message);

    }

}

async function loadVariants(modelId) {

    if (!modelId) {

        setVariants([]);

        return;

    }

    try {

        const data = await getVariantsByModel(modelId);

        setVariants(data);

    } catch (error) {

        alert(error.message);

    }

}

    function handleChange(e) {

    const { name, value } = e.target;

    setForm(prev => ({
        ...prev,
        [name]: value,

        ...(name === "brandId"
            ? { modelId: "", variantId: "" }
            : {}),

        ...(name === "modelId"
            ? { variantId: "" }
            : {})
    }));

    if (name === "brandId") {

        setModels([]);
        setVariants([]);

        if (value) {
            loadModels(value);
        }

    }

    if (name === "modelId") {

        setVariants([]);

        if (value) {
            loadVariants(value);
        }

    }
}

    async function handleSubmit(e) {

    e.preventDefault();

    try {

        const productRequest = {

            title: form.title,

            color: form.color,

            conditionType: form.conditionType,

            originalPrice: Number(form.originalPrice),

            sellingPrice: Number(form.sellingPrice),

            stockQuantity: Number(form.stockQuantity),

            warranty: form.warranty,

            imageUrl: isEditMode
                  ? currentImageUrl
                  : "",

            description: form.description,

            variantId: Number(form.variantId)

        };

        let savedProduct;

        if (isEditMode) {

            // EDIT EXISTING PRODUCT
            savedProduct = await updateProduct(
                id,
                productRequest
            );

        } else {

            // ADD NEW PRODUCT
            savedProduct = await addProduct(
                productRequest
            );

        }

        // Upload image only when a new image was selected
        if (imageFile) {

            await uploadProductImage(
                savedProduct.id,
                imageFile
            );

        }

        alert(
            isEditMode
                ? "Product updated successfully!"
                : "Product added successfully!"
        );

        navigate("/admin/products");

    } catch (error) {

        console.error(
            "SAVE PRODUCT ERROR:",
            error
        );

        alert(error.message);

    }

}
     
    return (

        <div className="product-form-page">

            <div className="product-form-card">

                <h2>
    {isEditMode ? "Edit Product" : "Add Product"}
</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Product Title</label>

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Brand</label>

                        <select
                            name="brandId"
                            value={form.brandId}
                            onChange={handleChange}
                        >

                           <option value="">
                               Select Brand
                           </option>

                           {brands.map((brand) => (

                             <option
                                key={brand.id}
                                value={brand.id}
                            >
                               {brand.name}
                             </option>

                         ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Device Model</label>

                        <select
                            name="modelId"
                            value={form.modelId}
                            onChange={handleChange}
                        >

                          <option value="">Select Model</option>

                            {models.map((model) => (

                              <option
                                 key={model.id}
                                 value={model.id}
                              >
                                 {model.name}
                              </option>

                          ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Variant</label>

                        <select
                            name="variantId"
                            value={form.variantId}
                            onChange={handleChange}
                        >

                            <option value="">Select Variant</option>

{variants.map((variant) => (

    <option
    key={variant.id}
    value={variant.id}
>
    {variant.ram} RAM • {variant.storage}
</option>

))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Color</label>

                        <input
                            name="color"
                            value={form.color}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Condition</label>

                        <select
                            name="conditionType"
                            value={form.conditionType}
                            onChange={handleChange}
                        >

                            <option value="NEW">NEW</option>

                            <option value="LIKE_NEW">
                                LIKE NEW
                            </option>

                            <option value="GOOD">
                                GOOD
                            </option>

                            <option value="FAIR">
                                FAIR
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Original Price</label>

                        <input
                            type="number"
                            name="originalPrice"
                            value={form.originalPrice}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Selling Price</label>

                        <input
                            type="number"
                            name="sellingPrice"
                            value={form.sellingPrice}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Stock Quantity</label>

                        <input
                            type="number"
                            name="stockQuantity"
                            value={form.stockQuantity}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Warranty</label>

                        <input
                            name="warranty"
                            value={form.warranty}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            rows="4"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

    <label>Product Image</label>

    {isEditMode && currentImageUrl && (

        <div className="current-product-image">

            <p>Current Image</p>

            <img
                src={
                    currentImageUrl.startsWith("http")
                        ? currentImageUrl
                        : `http://localhost:8080${currentImageUrl}`
                }
                alt={form.title || "Product"}
            />

        </div>

    )}

    <input
        type="file"
        accept="image/*"
        onChange={(e) =>
            setImageFile(
                e.target.files?.[0] || null
            )
        }
    />

    {isEditMode && (

        <small className="image-help-text">

            Current image will be kept.
            Choose a new image only if you want to replace it.

        </small>

    )}

</div>

                    <button
                        className="save-product-btn"
                        type="submit"
                    >
                        Save Product
                    </button>

                </form>

            </div>

        </div>

    );

}

export default AdminProductForm;