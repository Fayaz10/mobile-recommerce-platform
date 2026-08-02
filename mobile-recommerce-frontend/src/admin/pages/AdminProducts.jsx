import {
    Snackbar,
    Alert
} from "@mui/material";

import ProductDrawer from "../components/ProductDrawer";

import {
    addProduct,
    updateProduct,
    uploadProductImage
} from "../../services/api";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getAdminProducts,
    updateProductStatus,
    deleteProduct
} from "../../services/api";

import "./AdminProducts.css";

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [saving, setSaving] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {

        try {

            const data = await getAdminProducts();

            setProducts(data);

        } catch (error) {

            alert(error.message);

        } finally {

            setLoading(false);

        }
    }

    async function handleStatusChange(product) {

        const newStatus = !product.active;

        const action =
            newStatus ? "activate" : "deactivate";

        const confirmed = window.confirm(
            `Are you sure you want to ${action} this product?`
        );

        if (!confirmed) return;

        try {

            await updateProductStatus(
                product.id,
                newStatus
            );

            await loadProducts();

        } catch (error) {

            alert(error.message);

        }
    }

    async function handleDelete(product) {

    const confirmed = window.confirm(
        `Are you sure you want to permanently delete "${product.title}"?`
    );

    if (!confirmed) return;

    try {

        await deleteProduct(product.id);

        setSnackbar({
            open: true,
            severity: "success",
            message: "Product deleted successfully."
        });

        await loadProducts();

    } catch (error) {

        setSnackbar({
            open: true,
            severity: "error",
            message: error.message
        });

    }

}

    // ============================
    // Drawer Functions
    // ============================

    function openAddDrawer() {

        setSelectedProduct(null);

        setDrawerOpen(true);

    }

    function openEditDrawer(product) {

        setSelectedProduct(product);

        setDrawerOpen(true);

    }

    function closeDrawer() {

        setDrawerOpen(false);

    }

    async function saveProduct(form, imageFile) {

        try {

            setSaving(true);

            let product;

            if (selectedProduct) {

                product = await updateProduct(
                    selectedProduct.id,
                    form
                );

            } else {

                product = await addProduct(form);

            }

            if (imageFile) {

                await uploadProductImage(
                    product.id,
                    imageFile
                );

            }

            setSnackbar({
                open: true,
                severity: "success",
                message: "Product saved successfully."
            });

            closeDrawer();

            await loadProducts();

        } catch (error) {

            setSnackbar({
                open: true,
                severity: "error",
                message: error.message
            });

        } finally {

            setSaving(false);

        }

    }

    if (loading) {

        return <h2>Loading products...</h2>;

    }

    return (

        <div className="admin-products-page">

            <div className="admin-products-header">

                <h2>Product Management</h2>

                <button
    className="add-product-btn"
    onClick={openAddDrawer}
>
    + Add Product
</button>

            </div>

            <table className="admin-products-table">

                <thead>

                    <tr>

                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {products.map(product => (

                        <tr key={product.id}>

                            <td>

                                <img
                                    className="admin-product-image"
                                    src={
                                        product.imageUrl
                                            ? product.imageUrl.startsWith("http")
                                                ? product.imageUrl
                                                : `http://localhost:8080${product.imageUrl}`
                                            : "/placeholder-phone.png"
                                    }
                                    alt={product.title}
                                />

                            </td>

                            <td>{product.title}</td>

                            <td>
                                ₹{product.sellingPrice}
                            </td>

                            <td>
                                {product.stockQuantity}
                            </td>

                            <td>

                                <span
                                    className={
                                        product.active
                                            ? "status-active"
                                            : "status-inactive"
                                    }
                                >
                                    {product.active
                                        ? "Active"
                                        : "Inactive"}
                                </span>

                            </td>

                            <td>

                                <button
    className="edit-btn"
    onClick={() => openEditDrawer(product)}
>
    Edit
</button>

                                <button
                                  className={
                                   product.active
                                       ? "deactivate-btn"
                                       : "activate-btn"
                                   }
                                   onClick={() =>
                                        handleStatusChange(product)
                                   }
                                >
                                   {product.active
                                   ? "Deactivate"
                                    : "Activate"}
                               </button>

                               <button
    className="delete-btn"
    onClick={() => handleDelete(product)}
>
    Delete
</button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <ProductDrawer
    open={drawerOpen}
    onClose={closeDrawer}
    onSave={saveProduct}
    product={selectedProduct}
    submitting={saving}
/>

<Snackbar
    open={snackbar.open}
    autoHideDuration={3000}
    onClose={() =>
        setSnackbar((prev) => ({
            ...prev,
            open: false
        }))
    }
>
    <Alert
        severity={snackbar.severity}
        onClose={() =>
            setSnackbar((prev) => ({
                ...prev,
                open: false
            }))
        }
        sx={{ width: "100%" }}
    >
        {snackbar.message}
    </Alert>
</Snackbar>

        </div>

    );

}

export default AdminProducts;