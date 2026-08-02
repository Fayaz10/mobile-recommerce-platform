import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    TextField,
    Typography
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { useEffect, useState } from "react";
import axios from "axios";

import { useSnackbar } from "../../components/common/SnackbarProvider";

function AdminProfile() {


    const { showSnackbar } = useSnackbar();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        role: ""
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            "http://localhost:8080/api/admin/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setProfile(response.data);
    };

    const saveProfile = async () => {

        try {

        const token = localStorage.getItem("token");

        await axios.put(
            "http://localhost:8080/api/admin/profile",
            {
                name: profile.name,
                phone: profile.phone
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Profile updated successfully","success");


         } catch (error) {

        alert(
            "Failed to update profile",
            "error"
        );

    }

    
    
    };

    const changePassword = async () => {

        const token = localStorage.getItem("token");

        await axios.put(
            "http://localhost:8080/api/admin/profile/change-password",
            password,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Password changed successfully");

        setPassword({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                Admin Profile
            </Typography>

            <Card>

                <CardContent>

                    <Box
    display="flex"
    justifycontent="center"
>

                        <Avatar
                            sx={{
                                width: 90,
                                height: 90,
                                bgcolor: "#1976d2"
                            }}
                        >
                            <PersonIcon fontSize="large" />
                        </Avatar>

                    </Box>

                    <Grid container spacing={3}>

                       <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={profile.name}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        name: e.target.value
                                    })
                                }
                            />
                        </Grid>

                       <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Email"
                                fullWidth
                                disabled
                                value={profile.email}
                            />
                        </Grid>

                       <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Phone"
                                fullWidth
                                value={profile.phone}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        phone: e.target.value
                                    })
                                }
                            />
                        </Grid>

                       <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Role"
                                fullWidth
                                disabled
                                value={profile.role}
                            />
                        </Grid>

                    </Grid>

                    <Box mt={3}>
                        <Button
                            variant="contained"
                            onClick={saveProfile}
                        >
                            Save Profile
                        </Button>
                    </Box>

                </CardContent>

            </Card>

            <Divider sx={{ my: 4 }} />

            <Card>

                <CardContent>

                    <Typography
                        variant="h5"
                        mb={3}
                    >
                        Change Password
                    </Typography>

                    <Grid container spacing={3}>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Current Password"
                                type="password"
                                fullWidth
                                value={password.currentPassword}
                                onChange={(e) =>
                                    setPassword({
                                        ...password,
                                        currentPassword: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="New Password"
                                type="password"
                                fullWidth
                                value={password.newPassword}
                                onChange={(e) =>
                                    setPassword({
                                        ...password,
                                        newPassword: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                value={password.confirmPassword}
                                onChange={(e) =>
                                    setPassword({
                                        ...password,
                                        confirmPassword: e.target.value
                                    })
                                }
                            />
                        </Grid>

                    </Grid>

                    <Box mt={3}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={changePassword}
                        >
                            Change Password
                        </Button>
                    </Box>

                </CardContent>

            </Card>

        </Box>
    );
}

export default AdminProfile;