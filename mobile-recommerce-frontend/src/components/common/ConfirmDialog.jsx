import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

import WarningAmberRoundedIcon
from "@mui/icons-material/WarningAmberRounded";

function ConfirmDialog({

    open,

    title = "Confirm Action",

    message = "Are you sure you want to continue?",

    confirmText = "Confirm",

    cancelText = "Cancel",

    onConfirm,

    onCancel

}) {

    return (

        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4
                }
            }}
        >

            <DialogTitle
                sx={{
                    textAlign: "center",
                    pt: 3
                }}
            >

                <WarningAmberRoundedIcon
                    sx={{
                        fontSize: 55,
                        color: "#ff6b00",
                        mb: 1
                    }}
                />

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >
                    {title}
                </Typography>

            </DialogTitle>

            <DialogContent>

                <Typography
                    textAlign="center"
                    color="text.secondary"
                >
                    {message}
                </Typography>

            </DialogContent>

            <DialogActions
                sx={{
                    justifyContent: "center",
                    gap: 2,
                    pb: 3
                }}
            >

                <Button
                    variant="outlined"
                    onClick={onCancel}
                    sx={{
                        minWidth: 110
                    }}
                >
                    {cancelText}
                </Button>

                <Button
                    variant="contained"
                    onClick={onConfirm}
                    sx={{
                        minWidth: 110,
                        bgcolor: "#ff6b00",
                        "&:hover": {
                            bgcolor: "#e65c00"
                        }
                    }}
                >
                    {confirmText}
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default ConfirmDialog;