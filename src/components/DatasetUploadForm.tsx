import React, {useCallback, useEffect} from "react";
import {useAPIClient} from "../api/bridge";
import {Typography, Stack, Box} from "@mui/joy";
import TextField from '@mui/material/TextField';
import {Snackbar} from "@mui/material";

export const DatasetUploadForm: React.FunctionComponent = () => {
    let api = useAPIClient();
    const [description, setDescription] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [file, setFile] = React.useState<File>();
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState<string>("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>("success");
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    let uploadDataset = () => {
        api.createDatasetDatasetPost(name, description, file).then((response) => {
            if (response.status === 200) {
                setSeverity("green");
                setSnackbarMessage("Dataset uploaded successfully");
                setOpen(true);
                window.location.reload();
            }
        }).catch((error) => {
            setSnackbarMessage("Error uploading dataset");
            setOpen(true);
            setSeverity("red")
        });
    }
    let selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        console.log(selectedFiles?.[0]);
        setFile(selectedFiles?.[0]);
    };
    return <Box>
        <Box>
            <Stack>
                <Typography level="h3">Upload Dataset</Typography>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="file" onChange={selectFile}/>
                <Stack justifyContent="flex-end">
                    <button onClick={uploadDataset}>Upload</button>
                </Stack>
            </Stack>

        </Box>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbarMessage}
            color={severity}/>
    </Box>
}