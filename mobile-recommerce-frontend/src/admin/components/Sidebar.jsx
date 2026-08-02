import { Link, useLocation } from "react-router-dom";

import {
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Box
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CategoryIcon from "@mui/icons-material/Category";
import DevicesIcon from "@mui/icons-material/Devices";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 270;

function Sidebar() {

    const location = useLocation();

    const menuItem = (text, icon, path) => (

        <ListItemButton
            component={Link}
            to={path}
            selected={location.pathname === path}
            sx={{
                borderRadius: 2,
                mb: 0.5,
                color: "#ffffff",

                "&.Mui-selected": {
                    backgroundColor: "#2563eb"
                },

                "&.Mui-selected:hover": {
                    backgroundColor: "#1d4ed8"
                },

                "&:hover": {
                    backgroundColor: "#1e293b"
                }
            }}
        >
            <ListItemIcon sx={{ color: "#ffffff" }}>
                {icon}
            </ListItemIcon>

            <ListItemText primary={text} />

        </ListItemButton>

    );

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    backgroundColor: "#111827",
                    color: "#ffffff",
                    borderRight: "none"
                }
            }}
        >

            <Toolbar>

                <Box>

                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                    >
                        Mobile Recommerce
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: "#94a3b8" }}
                    >
                        Admin Panel
                    </Typography>

                </Box>

            </Toolbar>

            <Divider sx={{ borderColor: "#334155" }} />

            <List>

                {menuItem(
                    "Dashboard",
                    <DashboardIcon />,
                    "/admin"
                )}

            </List>

            <Divider sx={{ borderColor: "#334155" }} />

            <Typography
                sx={{
                    pl: 2,
                    pt: 2,
                    pb: 1,
                    color: "#94a3b8",
                    fontWeight: "bold",
                    fontSize: 12
                }}
            >
                REFURBISHED STORE
            </Typography>

            <List>

                {menuItem(
                    "Brands",
                    <CategoryIcon />,
                    "/admin/brands"
                )}

                {menuItem(
                    "Device Models",
                    <DevicesIcon />,
                    "/admin/device-models"
                )}

                {menuItem(
                    "Device Variants",
                    <PhoneAndroidIcon />,
                    "/admin/device-variants"
                )}

                {menuItem(
                    "Products",
                    <Inventory2Icon />,
                    "/admin/products"
                )}

                {menuItem(
                    "Orders",
                    <ShoppingCartIcon />,
                    "/admin/orders"
                )}

                {menuItem(
                    "Reviews",
                    <StarBorderIcon />,
                    "/admin/reviews"
                )}

            </List>

            <Divider sx={{ borderColor: "#334155" }} />

            <Typography
                sx={{
                    pl: 2,
                    pt: 2,
                    pb: 1,
                    color: "#94a3b8",
                    fontWeight: "bold",
                    fontSize: 12
                }}
            >
                REPAIR MANAGEMENT
            </Typography>

            <List>

                {menuItem(
                    "Repair Problems",
                    <BuildIcon />,
                    "/admin/repair/problems"
                )}

                {menuItem(
                    "Repair Bookings",
                    <AssignmentIcon />,
                    "/admin/repair/bookings"
                )}

            </List>

            <Divider sx={{ borderColor: "#334155" }} />

            <Typography
                sx={{
                    pl: 2,
                    pt: 2,
                    pb: 1,
                    color: "#94a3b8",
                    fontWeight: "bold",
                    fontSize: 12
                }}
            >
                CUSTOMERS
            </Typography>

            <List>

                {menuItem(
                    "Customers",
                    <PeopleIcon />,
                    "/admin/customers"
                )}

            </List>

            <Divider sx={{ borderColor: "#334155" }} />

            <Typography
                sx={{
                    pl: 2,
                    pt: 2,
                    pb: 1,
                    color: "#94a3b8",
                    fontWeight: "bold",
                    fontSize: 12
                }}
            >
                SALES & REPORTS
            </Typography>

            <List>

                {menuItem(
                    "Sales Reports",
                    <BarChartIcon />,
                    "/admin/reports"
                )}

            </List>

            <Divider sx={{ borderColor: "#334155" }} />

            <List>

    {menuItem(
        "Admin Profile",
        <AccountCircleIcon />,
        "/admin/profile"
    )}

    {menuItem(
        "Settings",
        <SettingsIcon />,
        "/admin/settings"
    )}

</List>

        </Drawer>

    );
}

export default Sidebar;