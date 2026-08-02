import { useEffect, useState } from "react";
import axios from "axios";

import {
    updateConfirmBookingStatus
} from "../../services/api";

import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    MenuItem
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

export default function Repairbookings() {

    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookingStatus, setBookingStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/admin/repair-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);
            setBookings(response.data);

        } catch (error) {
            console.error("Error loading repair bookings:", error);
        } finally {
            setLoading(false);
        }

    };

    const filteredBookings = bookings.filter((booking) => {

    const keyword = search.toLowerCase();

    return (

        booking.bookingNumber?.toLowerCase().includes(keyword) ||

        booking.customerName?.toLowerCase().includes(keyword) ||

        booking.phone?.includes(keyword)

    );

});

const getStatusChip = (status) => {

    switch (status) {

        case "BOOKED":
            return <Chip label="Booked" color="warning" />;

        case "CONFIRMED":
            return <Chip label="Confirmed" color="info" />;

        case "IN_PROGRESS":
            return <Chip label="In Progress" color="primary" />;

        case "READY":
            return <Chip label="Ready" color="secondary" />;

        case "DELIVERED":
            return <Chip label="Delivered" color="success" />;

        case "CANCELLED":
            return <Chip label="Cancelled" color="error" />;

        default:
            return <Chip label={status} />;
    }

};

const columns = [

    {
        field: "bookingNumber",
        headerName: "Booking No",
        width: 180
    },

    {
        field: "customerName",
        headerName: "Customer",
        flex: 1
    },

    {
        field: "phone",
        headerName: "Mobile",
        width: 160
    },

    {
        field: "pickupDate",
        headerName: "Date",
        width: 140
    },

    {
        field: "bookingStatus",
        headerName: "Status",
        width: 170,

        renderCell: (params) =>
            getStatusChip(params.value)
    },

    {
    field: "action",
    headerName: "Action",
    width: 140,
    sortable: false,

    renderCell: (params) => (
        <Button
            variant="contained"
            size="small"
            onClick={() => {
                console.log("VIEW CLICKED", params.row);

                setSelectedBooking(params.row);
                setBookingStatus(params.row.bookingStatus);
            }}
        >
            VIEW
        </Button>
    )
}

];

const handleSaveStatus = async () => {

    try {

        await updateConfirmBookingStatus(
            selectedBooking.id,
            bookingStatus
        );

        alert("Booking updated successfully.");

        setSelectedBooking(null);

        loadBookings();

    } catch (error) {

        console.error(error);

        alert("Failed to update booking.");

    }

};

    if (loading) {
        return <h2>Loading Repair Bookings...</h2>;
    }

    return (

        <Box>

            <Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3
    }}
>

    <Typography
        variant="h4"
        fontWeight="bold"
    >
        Repair Bookings
    </Typography>

</Box>

            <TextField
    fullWidth
    placeholder="Search booking..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    sx={{ mb: 3 }}
/>

<Paper
    sx={{
        height: 600,
        borderRadius: 3
    }}
>

    <DataGrid

        rows={filteredBookings}

        columns={columns}

        pageSizeOptions={[10, 20,50,100]}

        initialState={{
            pagination: {
                paginationModel: {
                    pageSize: 10
                }
            }
        }}

        disableRowSelectionOnClick

    />

</Paper>
{console.log("Selected Booking:", selectedBooking)}
            {selectedBooking && (

<Dialog
    open={selectedBooking !== null}
    onClose={() => setSelectedBooking(null)}
    fullWidth
    maxWidth="md"
>

 <DialogTitle> Repair Booking Details  </DialogTitle>

        <DialogContent>

<Typography>
    <strong>Booking No:</strong> {selectedBooking?.bookingNumber}
</Typography>

<Typography>
    <strong>Customer:</strong> {selectedBooking?.customerName}
</Typography>

<Typography>
    <strong>Mobile:</strong> {selectedBooking?.phone}
</Typography>

<Typography>
    <strong>Date:</strong> {selectedBooking?.pickupDate}
</Typography>

<TextField
    select
    fullWidth
    label="Status"
    sx={{ mt: 2 }}
    value={bookingStatus}
    onChange={(e)=>setBookingStatus(e.target.value)}
>
    <MenuItem value="BOOKED">BOOKED</MenuItem>
    <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
    <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
    <MenuItem value="READY">READY</MenuItem>
    <MenuItem value="DELIVERED">DELIVERED</MenuItem>
    <MenuItem value="CANCELLED">CANCELLED</MenuItem>
</TextField>

</DialogContent>

        <DialogActions>

<Button
    onClick={() => setSelectedBooking(null)}
>
    Close
</Button>

<Button
    variant="contained"
    onClick={handleSaveStatus}
>
    SAVE
</Button>

</DialogActions>
</Dialog>

)}

        </Box>

    );

}