import React from "react";
import {useAPIClient} from "../api/bridge";
import {useNavigate} from "react-router-dom";
import {TrainParameters, InceptionParams, DatasetListView} from "../api";
import {Snackbar} from "@mui/material";
import {Button, FormControl, Slider, Stack} from "@mui/joy";
import TextField from "@mui/material/TextField";

export const ModelCreatePage: React.FunctionComponent = () => {
    let api = useAPIClient();
    let navigate = useNavigate();
    const [datasets, setDatasets] = React.useState<DatasetListView[]>([]);
    const [trainParameters, setTrainParameters] = React.useState<TrainParameters>({} as TrainParameters);
    const [inceptionParams, setInceptionParams] = React.useState<InceptionParams>({} as InceptionParams);
    const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");
    const [severity, setSeverity] = React.useState<"success" | "error" | "info" | "warning" | undefined>("success");
    let handleClose = () => {
        setSnackbarOpen(false);
    }
    let steps = [

    ];
    React.useEffect(() => {
        api.getDatasetsDatasetGet().then((response) => {
            setDatasets(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    let handleTrainParametersChange = (value: any, key: string) => {
        setTrainParameters((prev) => ({...prev, [key]: value}));
    }
    let handleInceptionParamsChange = (value: any, key: string) => {
        setInceptionParams((prev) => ({...prev, [key]: value}));
    }
    let handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        let realTrainParameters = trainParameters as TrainParameters;
        realTrainParameters.parameters = inceptionParams as InceptionParams;
        api.createModelModelTrainPost(realTrainParameters).then((response) => {
            if (response.status === 200) {
                setSeverity("success");
                setSnackbarMessage("Model created successfully and currently training");
                setSnackbarOpen(true);
                navigate("/models");
            }

        }).catch((error) => {
            setSeverity("error");
            setSnackbarMessage("Error creating model");
            setSnackbarOpen(true);
        });
    }

    return (
        <Stack>
            <div>
                <h1>Build A Model</h1>
            </div>
            <FormControl>
                <TextField
                label = "Model Name"
                type = "number"
                />
                <Slider
                    marks
                    max={1}
                    min={0}
                    step={0.005}
                    value={inceptionParams.learning_rate}
                    valueLabelDisplay="auto"
                />
                <Slider
                    marks
                    max={1}
                    min={0}
                    step={0.1}
                    value={inceptionParams.validation_split}
                    valueLabelDisplay="auto"
                />
            </FormControl>
            <Button onClick={(e) => handleSubmit(e)}>Train!</Button>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarMessage}
                color={severity}/>

        </Stack>

    );
}
