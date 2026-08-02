import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    FormControlLabel,
    TextField
} from "@mui/material";

export default function DeviceModelDialog({

    open,
    onClose,
    onSave,

    model,
    setModel,

    brands

}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {model.id
                    ? "Edit Device Model"
                    : "Add Device Model"}

            </DialogTitle>

            <DialogContent>

                <Stack
                    spacing={2}
                    mt={1}
                >

                    <FormControl fullWidth>

                        <InputLabel>
                            Brand
                        </InputLabel>

                        <Select
                            value={model.brand?.id || ""}
                            label="Brand"
                            onChange={(e) =>
                                setModel({
                                    ...model,
                                    brand: {
                                        id: e.target.value
                                    }
                                })
                            }
                        >

                            {brands.map((brand) => (

                                <MenuItem
                                    key={brand.id}
                                    value={brand.id}
                                >
                                    {brand.name}
                                </MenuItem>

                            ))}

                        </Select>

                    </FormControl>

                    <TextField
                        label="Model Name"
                        fullWidth
                        value={model.name || ""}
                        onChange={(e) =>
                            setModel({
                                ...model,
                                name: e.target.value
                            })
                        }
                    />

                    <TextField
                        label="Image URL"
                        fullWidth
                        value={model.imageUrl || ""}
                        onChange={(e) =>
                            setModel({
                                ...model,
                                imageUrl: e.target.value
                            })
                        }
                    />

                    <TextField
                        label="Display Order"
                        type="number"
                        value={
                            model.displayOrder || 0
                        }
                        onChange={(e) =>
                            setModel({
                                ...model,
                                displayOrder:
                                    Number(
                                        e.target.value
                                    )
                            })
                        }
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    model.active ??
                                    true
                                }
                                onChange={(e) =>
                                    setModel({
                                        ...model,
                                        active:
                                            e.target.checked
                                    })
                                }
                            />
                        }
                        label="Active"
                    />

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={onSave}
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>

    );

}