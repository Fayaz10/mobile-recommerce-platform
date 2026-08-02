import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout() {
    return (
        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: "#f5f7fb",
                    minHeight: "100vh"
                }}
            >
                <Header />

                <Box
                    sx={{
                        padding: 3,
                        marginTop: "70px"
                    }}
                >
                    <Outlet />
                </Box>

            </Box>

        </Box>
    );
}

export default AdminLayout;