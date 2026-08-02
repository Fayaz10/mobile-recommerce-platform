import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    Stack,
    Switch,
    TextField
} from "@mui/material";

export default function DeviceVariantDialog({

    open,
    onClose,
    onSave,

    variant,
    setVariant,

    brands,
    models

}) {

    const selectedBrandId =
        variant?.deviceModel?.brand?.id || "";

    const filteredModels =
        models.filter(model =>
            !selectedBrandId ||
            model.brand?.id === selectedBrandId
        );

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>

                Device Variant

            </DialogTitle>

            <DialogContent>

                <Stack spacing={2} mt={1}>

                    <TextField
                        select
                        label="Brand"
                        value={selectedBrandId}
                        onChange={(e)=>{

                            const brand =
                                brands.find(
                                    b=>b.id===e.target.value
                                );

                            setVariant({
                                ...variant,
                                deviceModel:{
                                    brand
                                }
                            });

                        }}
                    >

                        {brands.map(brand=>(

                            <MenuItem
                                key={brand.id}
                                value={brand.id}
                            >
                                {brand.name}
                            </MenuItem>

                        ))}

                    </TextField>

                    <TextField
                        select
                        label="Model"
                        value={variant?.deviceModel?.id || ""}
                        onChange={(e)=>{

                            const model =
                                models.find(
                                    m=>m.id===e.target.value
                                );

                            setVariant({
                                ...variant,
                                deviceModel:model
                            });

                        }}
                    >

                        {filteredModels.map(model=>(

                            <MenuItem
                                key={model.id}
                                value={model.id}
                            >
                                {model.name}
                            </MenuItem>

                        ))}

                    </TextField>

                    <TextField
                        label="Storage"
                        value={variant?.storage || ""}
                        onChange={(e)=>
                            setVariant({
                                ...variant,
                                storage:e.target.value
                            })
                        }
                    />

                    <TextField
                        label="RAM"
                        value={variant?.ram || ""}
                        onChange={(e)=>
                            setVariant({
                                ...variant,
                                ram:e.target.value
                            })
                        }
                    />

                    <TextField
                        label="Color"
                        value={variant?.color || ""}
                        onChange={(e)=>
                            setVariant({
                                ...variant,
                                color:e.target.value
                            })
                        }
                    />

                    <TextField
                        label="Base Price"
                        type="number"
                        value={variant?.basePrice || ""}
                        onChange={(e)=>
                            setVariant({
                                ...variant,
                                basePrice:e.target.value
                            })
                        }
                    />

                    <TextField
                        label="Display Order"
                        type="number"
                        value={variant?.displayOrder || 0}
                        onChange={(e)=>
                            setVariant({
                                ...variant,
                                displayOrder:e.target.value
                            })
                        }
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    variant?.active ?? true
                                }
                                onChange={(e)=>
                                    setVariant({
                                        ...variant,
                                        active:e.target.checked
                                    })
                                }
                            />
                        }
                        label="Active"
                    />

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
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