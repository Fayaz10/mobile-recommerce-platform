const API_BASE_URL = "https://mobile-recommerce-backend-1.onrender.com/api";
export async function getProducts() {

    const response = await fetch(
        `${API_BASE_URL}/products`
    );

    if (!response.ok) {
        throw new Error("Failed to load products");
    }

    return response.json();
}

export async function getProductById(id) {

    const response = await fetch(
        `${API_BASE_URL}/products/${id}`
    );

    if (!response.ok) {
        throw new Error("Product not found");
    }

    return response.json();
}

export async function registerUser(userData) {

    const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(userData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Registration failed"
        );
    }

    return data;
}

export async function loginUser(loginData) {

    const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(loginData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Login failed"
        );
    }

    return data;
}

// ==========================================
// AUTH HEADER
// ==========================================

function getAuthHeaders() {

    const token =
        localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}


// ==========================================
// GET LOGGED-IN USER CART
// ==========================================

export async function getCart() {

    const response = await fetch(
        `${API_BASE_URL}/cart`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load cart"
        );
    }

    return data;
}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

export async function addProductToCart(
    productId,
    quantity = 1
) {

    const response = await fetch(
        `${API_BASE_URL}/cart/items`,
        {
            method: "POST",

            headers: getAuthHeaders(),

            body: JSON.stringify({
                productId,
                quantity
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to add product to cart"
        );
    }

    return data;
}


// ==========================================
// UPDATE CART ITEM QUANTITY
// ==========================================

export async function updateCartItem(
    cartItemId,
    quantity
) {

    const response = await fetch(
        `${API_BASE_URL}/cart/items/${cartItemId}`,
        {
            method: "PUT",

            headers: getAuthHeaders(),

            body: JSON.stringify({
                quantity
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update cart"
        );
    }

    return data;
}


// ==========================================
// REMOVE ONE CART ITEM
// ==========================================

export async function removeCartItem(
    cartItemId
) {

    const response = await fetch(
        `${API_BASE_URL}/cart/items/${cartItemId}`,
        {
            method: "DELETE",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to remove cart item"
        );
    }

    return data;
}


// ==========================================
// CLEAR ENTIRE CART
// ==========================================

export async function clearBackendCart() {

    const response = await fetch(
        `${API_BASE_URL}/cart`,
        {
            method: "DELETE",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to clear cart"
        );
    }

    return data;
}

// ==========================================
// GET MY SAVED ADDRESSES
// ==========================================

export async function getMyAddresses() {

    const response = await fetch(
        `${API_BASE_URL}/addresses`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load addresses"
        );
    }

    return data;
}


// ==========================================
// ADD NEW ADDRESS
// ==========================================

export async function addAddress(
    addressData
) {

    const response = await fetch(
        `${API_BASE_URL}/addresses`,
        {
            method: "POST",

            headers: getAuthHeaders(),

            body: JSON.stringify(
                addressData
            )
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to add address"
        );
    }

    return data;
}


// ==========================================
// CHECKOUT BACKEND CART
// ==========================================

export async function checkoutCart(
    addressId,
    paymentMethod
) {

    const response = await fetch(
        `${API_BASE_URL}/orders/checkout/cart`,
        {
            method: "POST",

            headers: getAuthHeaders(),

            body: JSON.stringify({
                addressId: Number(addressId),
                paymentMethod: paymentMethod
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Checkout failed"
        );
    }

    return data;
}

// ==========================================
// GET LOGGED-IN USER ORDERS
// ==========================================

export async function getMyOrders() {

    const response = await fetch(
        `${API_BASE_URL}/orders`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load orders"
        );
    }

    return data;
}
// ==========================================
// GET ONE LOGGED-IN USER ORDER
// ==========================================

export async function getMyOrderById(id) {

    const response = await fetch(
        `${API_BASE_URL}/orders/${id}`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to load order details"
        );

    }

    return data;
}

// ==========================================
// GET LOGGED-IN USER PROFILE
// ==========================================

export async function getProfile() {

    const response = await fetch(
        `${API_BASE_URL}/profile`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load profile"
        );
    }

    return data;
}


// ==========================================
// UPDATE LOGGED-IN USER PROFILE
// ==========================================

export async function updateProfile(
    profileData
) {

    const response = await fetch(
        `${API_BASE_URL}/profile`,
        {
            method: "PUT",

            headers: getAuthHeaders(),

            body: JSON.stringify(
                profileData
            )
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update profile"
        );
    }

    return data;
}


// ==========================================
// CHANGE PASSWORD
// ==========================================

export async function changePassword(
    passwordData
) {

    const response = await fetch(
        `${API_BASE_URL}/profile/password`,
        {
            method: "PUT",

            headers: getAuthHeaders(),

            body: JSON.stringify(
                passwordData
            )
        }
    );

    if (!response.ok) {

        let data = {};

        try {
            data = await response.json();
        } catch {
            // Backend may return no JSON body
        }

        throw new Error(
            data.message ||
            "Failed to change password"
        );
    }

    // Backend returns 204 No Content
    return true;
}

// ==========================================
// DELETE SAVED ADDRESS
// ==========================================

export async function deleteAddress(addressId) {

    const token = localStorage.getItem("token");

    const response = await fetch(
    `${API_BASE_URL}/addresses/${addressId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        let message = "Unable to delete address.";

        try {

            const data = await response.json();

            message =
                data.message ||
                data.error ||
                message;

        } catch {
            // Use default error message
        }

        throw new Error(message);
    }

    return true;
}

// ==========================================
// GET ONE SAVED ADDRESS
// ==========================================

export async function getAddressById(addressId) {

    const addresses = await getMyAddresses();

    const address = addresses.find(
        (item) =>
            String(item.id) === String(addressId)
    );

    if (!address) {
        throw new Error("Address not found");
    }

    return address;
}


// ==========================================
// UPDATE SAVED ADDRESS
// ==========================================

export async function updateAddress(
    addressId,
    addressData
) {

    const response = await fetch(
        `${API_BASE_URL}/addresses/${addressId}`,
        {
            method: "PUT",

            headers: getAuthHeaders(),

            body: JSON.stringify(addressData)
        }
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        // Backend may return no JSON body
    }

    if (!response.ok) {
        throw new Error(
            data?.message ||
            data?.error ||
            "Failed to update address"
        );
    }

    return data || true;
}

// ==========================================
// ADMIN - GET ALL DEVICE MODELS
// ==========================================

export async function getDeviceModels() {

    const response = await fetch(
        `${API_BASE_URL}/device-models`,
        {
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load device models"
        );
    }

    return data;
}


// ==========================================
// ADMIN - ADD DEVICE MODEL
// ==========================================

export async function addDeviceModel(
    brandId,
    model
) {

    const response = await fetch(
        `${API_BASE_URL}/device-models/brand/${brandId}`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(model)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to add device model"
        );
    }

    return data;
}


// ==========================================
// ADMIN - UPDATE DEVICE MODEL
// ==========================================

export async function updateDeviceModel(
    id,
    model
) {

    const response = await fetch(
        `${API_BASE_URL}/device-models/${id}`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(model)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update device model"
        );
    }

    return data;
}


// ==========================================
// ADMIN - DELETE DEVICE MODEL
// ==========================================

export async function deleteDeviceModel(id) {

    const response = await fetch(
        `${API_BASE_URL}/device-models/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeaders()
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to delete device model"
        );
    }

    return true;
}

// ==========================
// Device Variants
// ==========================

export async function getDeviceVariants() {

    const response = await fetch(
        `${API_BASE_URL}/device-variants`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load device variants"
        );
    }

    return data;
}

export async function getDeviceVariantsByModel(modelId) {

    const response = await fetch(
        `${API_BASE_URL}/device-variants/model/${modelId}`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load device variants"
        );
    }

    return data;
}

export async function searchDeviceVariants(keyword) {

    const response = await fetch(
        `${API_BASE_URL}/device-variants/search?keyword=${encodeURIComponent(keyword)}`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Search failed"
        );
    }

    return data;
}

export async function addDeviceVariant(modelId, variant) {

    const response = await fetch(
        `${API_BASE_URL}/device-variants/model/${modelId}`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(variant)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to add variant"
        );
    }

    return data;
}

export async function updateDeviceVariant(id, variant) {

    const response = await fetch(
        `${API_BASE_URL}/device-variants/${id}`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(variant)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update variant"
        );
    }

    return data;
}

export async function deleteDeviceVariant(id) {

    const response = await fetch(
        `${API_BASE_URL}/device-variants/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeaders()
        }
    );

    if (!response.ok) {

        let data = {};

        try {
            data = await response.json();
        } catch (e) {
            // Ignore if response has no JSON body
        }

        throw new Error(
            data.message ||
            "Failed to delete variant"
        );
    }
}

// ==========================================
// ADMIN - GET ALL ORDERS
// ==========================================

export async function getAdminOrders() {

    const response = await fetch(
        `${API_BASE_URL}/admin/orders`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load admin orders"
        );
    }

    return data;
}


// ==========================================
// ADMIN - GET ONE ORDER
// ==========================================

export async function getAdminOrderById(id) {

    const response = await fetch(
        `${API_BASE_URL}/admin/orders/${id}`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load order details"
        );
    }

    return data;
}


// ==========================================
// ADMIN - UPDATE ORDER STATUS
// ==========================================

export async function updateAdminOrderStatus(
    id,
    status
) {

    const response = await fetch(
        `${API_BASE_URL}/admin/orders/${id}/status`,
        {
            method: "PUT",

            headers: getAuthHeaders(),

            body: JSON.stringify({
                status: status
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update order status"
        );
    }

    return data;
}

// ==========================================
// ADMIN - GET ALL PRODUCTS
// ==========================================

export async function getAdminProducts() {

    const response = await fetch(
        `${API_BASE_URL}/products/admin/all`,
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to load products"
        );
    }

    return data;
}


// ==========================================
// ADMIN - ADD PRODUCT
// ==========================================

export async function addProduct(productData) {

    const response = await fetch(
        `${API_BASE_URL}/products`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(productData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to add product"
        );
    }

    return data;
}


// ==========================================
// ADMIN - UPDATE PRODUCT
// ==========================================

export async function updateProduct(
    id,
    productData
) {

    const response = await fetch(
        `${API_BASE_URL}/products/${id}`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(productData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update product"
        );
    }

    return data;
}


// ==========================================
// ADMIN - DELETE PRODUCT
// ==========================================

export async function deleteProduct(id) {

    const response = await fetch(
        `${API_BASE_URL}/products/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
}

export async function getBrands() {

    const response = await fetch(
        `${API_BASE_URL}/brands`
    );

    if (!response.ok) {
        throw new Error("Failed to load brands");
    }

    return response.json();
}
export async function getModelsByBrand(brandId) {

    const response = await fetch(
        `${API_BASE_URL}/device-models/brand/${brandId}`
    );

    if (!response.ok) {
        throw new Error("Failed to load models");
    }

    return response.json();
}

export async function getVariantsByModel(modelId) {

    const response = await fetch(
        `${API_BASE_URL}/device-variants/model/${modelId}`
    );

    if (!response.ok) {
        throw new Error("Failed to load variants");
    }

    return response.json();
}

// ==========================================
// ADMIN - UPLOAD PRODUCT IMAGE
// ==========================================

export async function uploadProductImage(
    productId,
    imageFile
) {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("file", imageFile);

    const response = await fetch(
        `${API_BASE_URL}/products/${productId}/image`,
        {
            method: "POST",

            headers: {
                Authorization: `Bearer ${token}`
            },

            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Image upload failed"
        );

    }

    return data;
}

// ==========================================
// ADMIN - ACTIVATE / DEACTIVATE PRODUCT
// ==========================================

export async function updateProductStatus(
    productId,
    active
) {

    const response = await fetch(
        `${API_BASE_URL}/products/${productId}/status`,
        {
            method: "PATCH",

            headers: getAuthHeaders(),

            body: JSON.stringify({
                active: active
            })
        }
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        // Backend may return no JSON body
    }

    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            "Failed to update product status"
        );

    }

    return data || true;
}

// ==========================================
// PUBLIC - GET ALL BRANDS
// ==========================================

export async function getAllBrands() {

    const response = await fetch(
        `${API_BASE_URL}/brands`
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new Error(
            data?.message || "Failed to load brands"
        );
    }

    return data;
}

// ==========================================
// PUBLIC - GET PRODUCTS BY BRAND
// ==========================================

export async function getProductsByBrand(brandId) {

    const response = await fetch(
        `${API_BASE_URL}/products/brand/${brandId}`
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {

        throw new Error(
            data?.message ||
            "Unable to load brand products"
        );
    }

    return data;
}

// ==========================================
// PUBLIC - GET BRAND BY ID
// ==========================================

export async function getBrandById(brandId) {

    const response = await fetch(
        `${API_BASE_URL}/brands/${brandId}`
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {

        throw new Error(
            data?.message ||
            "Unable to load brand"
        );
    }

    return data;
}

// ==========================================
// REPAIR - BOOK REPAIR
// ==========================================

export async function bookRepair(bookingData) {

    const response = await fetch(
        `${API_BASE_URL}/repair/book`,
        {
            method: "POST",

            headers: getAuthHeaders(),

            body: JSON.stringify(bookingData)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Repair booking failed"
        );

    }

    return data;

}

export async function getSelectRepair(modelId) {

    const response = await fetch(
        `${API_BASE_URL}/repair/problems/${modelId}`,
        {
            headers: getAuthHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load repair problems");
    }

    return await response.json();
}

export async function getSelectModel(brandId) {

    const response = await fetch(
        `${API_BASE_URL}/device-models/brand/${brandId}`,
        {
            headers: getAuthHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load models");
    }

    return await response.json();
}

// ==========================================
// ADMIN - ADD BRAND
// ==========================================

export async function addBrand(brand) {

    const response = await fetch(
        `${API_BASE_URL}/brands`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(brand)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to add brand");
    }

    return data;
}

// ==========================================
// ADMIN - UPDATE BRAND
// ==========================================

export async function updateBrand(id, brand) {

    const response = await fetch(
        `${API_BASE_URL}/brands/${id}`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(brand)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update brand");
    }

    return data;
}

// ==========================================
// ADMIN - DELETE BRAND
// ==========================================

export async function deleteBrand(id) {

    const response = await fetch(
        `${API_BASE_URL}/brands/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete brand");
    }

    return true;
}

// ==========================================
// ADMIN - GET ALL REPAIR PROBLEMS
// ==========================================

export async function getAllSelectRepair() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/repair/admin/problems`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Unable to load repair problems");
    }

    return await response.json();
}


// ==========================================
// ADMIN - ADD REPAIR PROBLEM
// ==========================================

export async function addRepairProblem(data) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/repair/admin/problems`,
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(data)
        }
    );

    if(!response.ok){
        throw new Error("Unable to add repair problem");
    }

    return await response.json();

}


// ==========================================
// ADMIN - UPDATE REPAIR PROBLEM
// ==========================================

export async function updateRepairProblem(id,data){

    const token = localStorage.getItem("token");

    const response = await fetch(

        `${API_BASE_URL}/repair/admin/problems/${id}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },

            body:JSON.stringify(data)

        }

    );

    if(!response.ok){
        throw new Error("Unable to update repair problem");
    }

    return await response.json();

}

// ==========================================
// UPDATE REPAIR BOOKING STATUS
// ==========================================

export async function updateConfirmBookingStatus(id, status) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/admin/repair-bookings/${id}/status`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                bookingStatus: status
            })
        }
    );

    if (!response.ok) {
        throw new Error("Unable to update booking status");
    }

    return await response.json();
}

// ==========================================
// ADMIN - DELETE REPAIR PROBLEM
// ==========================================

export async function deleteRepairProblem(id){

    const token=localStorage.getItem("token");

    const response=await fetch(

        `${API_BASE_URL}/repair/admin/problems/${id}`,

        {

            method:"DELETE",

            headers:{
                Authorization:`Bearer ${token}`
            }

        }

    );

    if(!response.ok){
        throw new Error("Unable to delete repair problem");
    }

}

export async function uploadImage(file) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
    `${API_BASE_URL}/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error("Image upload failed");
    }

    return await response.json();
}

// ==========================================
// MY REPAIR BOOKINGS
// ==========================================

export async function getMyRepairBookings() {

    const response = await fetch(
        `${API_BASE_URL}/repair/my-bookings`,
        {
            headers: getAuthHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Unable to load repair bookings");
    }

    return await response.json();
}