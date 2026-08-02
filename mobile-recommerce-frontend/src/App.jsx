// React Router

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// CSS

import "./App.css";

// Customer Pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import SavedAddresses from "./pages/SavedAddresses";
import AddressForm from "./pages/AddressForm";

// Shop Pages
import Brands from "./pages/Brands";
import BrandProducts from "./pages/BrandProducts";
import RefurbishedProducts from "./pages/RefurbishedProducts";

// Repair Pages
import SelectBrand from "./pages/repair/SelectBrand";
import SelectModel from "./pages/repair/SelectModel";
import SelectRepair from "./pages/repair/SelectRepair";
import ConfirmBooking from "./pages/repair/ConfirmBooking";
import SelectAppointment from "./pages/repair/SelectAppointment";
import ReviewBooking from "./pages/repair/ReviewBooking";
import BookingSuccess from "./pages/repair/BookingSuccess";
import MyRepairBookings from "./pages/repair/MyRepairBookings";

//  Admin Pages
import Dashboard from "./admin/pages/Dashboard";
import AdminProfile from "./admin/pages/AdminProfile";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminProductForm from "./admin/pages/AdminProductForm";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminOrderDetails from "./admin/pages/AdminOrderDetails";
import AdminBrands from "./admin/pages/AdminBrands";
import AdminDeviceModels from "./admin/pages/AdminDeviceModels";
import AdminDeviceVariants from "./admin/pages/AdminDeviceVariants";
import AdminCustomers from "./admin/pages/AdminCustomers";
import AdminReviews from "./admin/pages/AdminReviews";
import AdminReports from "./admin/pages/AdminReports";
import AdminSettings from "./admin/pages/AdminSettings";
import RepairProblems from "./admin/pages/RepairProblems";
import RepairBookings from "./admin/pages/RepairBookings";

// New Admin Layout
import AdminLayout from "./admin/layout/AdminLayout";

function App() {

    return (

        <BrowserRouter>

            <Routes>

             {/* ================= CUSTOMER ================= */}

                <Route 
                   path="/" 
                   element={<Home />} 
                />

                <Route 
                   path="/brands" 
                   element={<Brands />} 
                />

                <Route
                    path="/brands/:brandId"
                    element={<BrandProducts />}
                />

                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/order-success/:id"
                    element={<OrderSuccess />}
                />

                <Route
                    path="/orders"
                    element={<MyOrders />}
                />

                <Route
                    path="/orders/:id"
                    element={<OrderDetails />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/profile/password"
                    element={<ChangePassword />}
                />

                <Route
                    path="/profile/addresses"
                    element={<SavedAddresses />}
                />

                <Route
                    path="/profile/addresses/new"
                    element={<AddressForm />}
                />

                <Route
                    path="/profile/addresses/:id/edit"
                    element={<AddressForm />}
                />

                <Route
                    path="/refurbished"
                    element={<RefurbishedProducts />}
                />

                <Route
                    path="/repair"
                    element={<SelectBrand />}
                />

                <Route
                    path="/repair/:brand"
                    element={<SelectModel />}
                />

                <Route
                    path="/repair/:brand/:model"
                    element={<SelectRepair />}
                />

                <Route
                       path="/repair/booking"
                        element={<ConfirmBooking />}
                    />

                <Route
                   path="/repair/select-date-time"
                   element={<SelectAppointment />}
                />

                <Route
                    path="/repair/confirmation"
                   element={<ReviewBooking />}
                />

                <Route
                    path="/repair/booked"
                    element={<BookingSuccess />}
                />

                <Route
                    path="/repair/my-bookings"
                    element={<MyRepairBookings />}
                />
                

             {/* ================= ADMIN ================= */}

             <Route 
                path="/admin" 
                element={<AdminLayout />} 
             >

                <Route
                    index
                    element={<Dashboard />}
                />

                <Route 
                   path="profile" 
                   element={<AdminProfile />} 
                />

                <Route
                     path="products"
                     element={<AdminProducts />}
                />

                <Route
                     path="products/new"
                     element={<AdminProductForm />}
                />

                <Route
                     path="products/:id/edit"
                     element={<AdminProductForm />}
                />

                <Route
                     path="orders"
                     element={<AdminOrders />}
                />

                <Route
                     path="orders/:id"
                     element={<AdminOrderDetails />}
                />

                <Route path="brands" element={<AdminBrands />} />

                <Route path="device-models" element={<AdminDeviceModels />} />

                <Route path="device-variants" element={<AdminDeviceVariants />} />

                <Route path="customers" element={<AdminCustomers />} />

                <Route path="reviews" element={<AdminReviews />} />

                <Route path="reports" element={<AdminReports />} />

                <Route path="settings" element={<AdminSettings />} />

                <Route
                     path="repair/problems"
                     element={<RepairProblems />}
                />

                <Route
                     path="repair/bookings"
                     element={<RepairBookings />}
                />

             </Route>

            </Routes>

        </BrowserRouter>

    );
}

export default App;