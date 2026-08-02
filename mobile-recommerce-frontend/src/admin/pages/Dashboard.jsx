import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Paper,
    Button,
    Stack
} from "@mui/material";

import { useEffect, useState } from "react";

import axios from "axios";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Dashboard() {


    const [dashboard, setDashboard] = useState({

    totalProducts: 0,

    totalOrders: 0,

    totalCustomers: 0,

    totalRepairBookings: 0,

    totalRevenue: 0,

    totalReviews: 0

});

useEffect(() => {

    loadDashboard();

}, []);

const loadDashboard = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(

            "http://localhost:8080/api/admin/dashboard",

            {

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        );

        setDashboard(response.data);

    } catch (error) {

        console.error(error);

    }

};

const cards = [

    {

        title: "Products",

        value: dashboard.totalProducts,

        icon: <Inventory2Icon fontSize="large" />,

        color: "#2563eb"

    },

    {

        title: "Orders",

        value: dashboard.totalOrders,

        icon: <ShoppingCartIcon fontSize="large" />,

        color: "#10b981"

    },

    {

        title: "Customers",

        value: dashboard.totalCustomers,

        icon: <PeopleIcon fontSize="large" />,

        color: "#f59e0b"

    },

    {

        title: "Repair Jobs",

        value: dashboard.totalRepairBookings,

        icon: <BuildIcon fontSize="large" />,

        color: "#ef4444"

    },

    {

    title: "Revenue",

    value: `₹${dashboard.totalRevenue}`,

    icon: <TrendingUpIcon fontSize="large" />,

    color: "#7c3aed"

}

];

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={1}
            >
                Dashboard
            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >
                Welcome back, Admin 👋
            </Typography>

            <Grid container spacing={3}>

                {cards.map((card) => (

                    <Grid
    size={{ xs: 12, sm: 6, md: 3 }}
    key={card.title}
>

                        <Card
                            elevation={3}
                            sx={{
                                borderRadius: 4
                            }}
                        >

                            <CardContent>

                                <Box
    sx={{
        display: "flex",
        justifyContent: "center"
    }}
>

                                    <Box>

                                        <Typography
                                            color="text.secondary"
                                        >
                                            {card.title}
                                        </Typography>

                                        <Typography
                                            variant="h4"
                                            fontWeight="bold"
                                        >
                                            {card.value}
                                        </Typography>

                                    </Box>

                                    <Box
                                        sx={{
                                            background: card.color,
                                            color: "white",
                                            borderRadius: "50%",
                                            width: 60,
                                            height: 60,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        {card.icon}
                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

            <Grid
                container
                spacing={3}
                mt={1}
            >

                <Grid
    size={{ xs: 12, md: 8 }}
>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            minHeight: 320
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            mb={2}
                        >
                            Sales Overview
                        </Typography>

                       <Stack
    sx={{
        alignItems: "center"
    }}
>

                            <TrendingUpIcon
                                sx={{
                                    fontSize: 90,
                                    color: "#2563eb"
                                }}
                            />

                        </Stack>

                        <Typography
                            align="center"
                            color="text.secondary"
                        >
                            Sales chart will be connected
                            to Spring Boot later.
                        </Typography>

                    </Paper>

                </Grid>

                <Grid
    size={{ xs: 12, md: 4 }}
>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            minHeight: 320
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            mb={3}
                        >
                            Quick Actions
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                        >
                            Add Product
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                        >
                            Manage Orders
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                        >
                            Repair Bookings
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                        >
                            View Reports
                        </Button>

                    </Paper>

                </Grid>

            </Grid>

        </Box>

    );

}

export default Dashboard;