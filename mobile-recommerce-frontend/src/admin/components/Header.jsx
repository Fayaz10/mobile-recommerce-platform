import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
    Avatar,
    Menu,
    MenuItem,
    InputBase,
    Paper
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAdminProfile } from "../services/adminService";

function Header() { 

    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
    name: "",
    email: ""
    });

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    useEffect(() => {

    loadProfile();

}, []);

const loadProfile = async () => {

    try {

        const response = await getAdminProfile();

        setAdmin(response.data);

    } catch (error) {

        console.log(error);

    }

};

    return (

        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                background: "#ffffff",
                color: "#111827",
                width: "calc(100% - 270px)",
                ml: "270px"
            }}
        >

            <Toolbar>

                <IconButton>

                    <MenuIcon />

                </IconButton>

                <Typography
                    variant="h6"
                    sx={{
                        ml: 2,
                        fontWeight: "bold"
                    }}
                >
                    Ambattur Mobiles Admin
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Paper
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 320,
                        mr: 4,
                        px: 2,
                        borderRadius: 3,
                        boxShadow: "none",
                        border: "1px solid #ddd"
                    }}
                >

                    <SearchIcon color="action" />

                    <InputBase
                        placeholder="Search..."
                        sx={{
                            ml: 1,
                            flex: 1
                        }}
                    />

                </Paper>

                <IconButton>

                    <Badge
                        badgeContent={3}
                        color="error"
                    >
                        <NotificationsIcon />
                    </Badge>

                </IconButton>

                <Box
                    onClick={openMenu}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        ml: 3
                    }}
                >

                    <Avatar
    sx={{
        bgcolor: "#2563eb",
        mr: 1
    }}
>
    {admin.name
        ? admin.name
              .split(" ")
              .map(word => word[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
        : "A"}
</Avatar>

                    <Typography
    sx={{
        fontWeight: 600
    }}
>
    {admin.name || "Admin"}
</Typography>

                    <KeyboardArrowDownIcon />

                </Box>

                <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={closeMenu}
>

    <MenuItem
    onClick={() => {

        closeMenu();

        navigate("/admin/profile");

    }}
>
    Profile
</MenuItem>

    <MenuItem
        onClick={() => {
            closeMenu();
            navigate("/admin/settings");
        }}
    >
        Settings
    </MenuItem>

    <MenuItem
        onClick={() => {
            localStorage.removeItem("token");
            closeMenu();
            navigate("/login");
        }}
    >
        Logout
    </MenuItem>

</Menu>

            </Toolbar>

        </AppBar>

    );

}

export default Header;