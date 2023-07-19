import React from "react";
import {useAPIClient} from "../api/bridge";
import {useNavigate} from "react-router-dom";
import {TrainParameters, InceptionParams, DatasetListView} from "../api";
import {ListItemSecondaryAction, ListItemText, Snackbar, StepLabel, Stepper, StepContent, Step} from "@mui/material";
import {Box, Button, Divider, FormControl, List, ListItem, Slider, Stack, Switch, Typography} from "@mui/joy";
import TextField from "@mui/material/TextField";

export const ModelCreatePage: React.FunctionComponent = () => {
    let api = useAPIClient();
    let navigate = useNavigate();
    const [datasets, setDatasets] = React.useState<DatasetListView[]>([])
    const [selectedDataset, setSelectedDataset] = React.useState<DatasetListView>({} as DatasetListView)
    const [trainParameters, ] = React.useState<TrainParameters>({} as TrainParameters);
    const [inceptionParams, setInceptionParams] = React.useState<InceptionParams>({} as InceptionParams);
    const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");
    const [severity, setSeverity] = React.useState<"success" | "error" | "info" | "warning" | undefined>("success");
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    let handleClose = () => {
        setSnackbarOpen(false);
    }
    let steps = [
        {
            label: "Select a Dataset",
            content: (
                <Stack>
                    <List>
                        {datasets.map((item, index) => (
                            <ListItem key={item.id}>
                                <ListItemText primary={item.name}/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        onChange={(e) => {
                                            if (selectedDataset.id === item.id) {
                                                setSelectedDataset({} as DatasetListView)
                                            } else {
                                                setSelectedDataset(item)
                                            }
                                        }
                                        }
                                        checked={selectedDataset.id === item.id}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            ),
            complete: () => {
                return selectedDataset.id !== undefined;
            }
        },
        {
            label: "Ready, Set, Train!",
            content: (
                <Stack>
                    <FormControl>
                        <Typography> General Parameters</Typography>
                        <TextField
                            label="Input Length"
                            type="number"
                            onChange={(e) => handleInceptionParamsChange(Number(e.target.value), "input_length")}
                        />
                        <TextField
                            label="Learning Rate"
                            onChange={(e) => handleInceptionParamsChange(Number(e.target.value), "learning_rate")}
                        />
                        <TextField
                            label="Batch Size"
                            type="number"
                            onChange={(e) => handleInceptionParamsChange(Number(e.target.value), "batch_size")}
                        />
                        <TextField
                            label="Epochs"
                            type="number"
                            onChange={(e) => handleInceptionParamsChange(Number(e.target.value), "epochs")}
                        />
                        <Typography gutterBottom>Validation Split</Typography>
                        <Slider
                            marks
                            max={1}
                            min={0}
                            step={0.1}
                            value={inceptionParams.validation_split}
                            onChange={(e,val) => handleInceptionParamsChange(val, "validation_split")}
                        />
                        <Divider/>
                        <Typography>Inception Architecture Parameters</Typography>
                        <TextField
                            label="N° Modules"
                            type="number"
                            onChange={(e) => handleInceptionParamsChange(Number(e.target.value), "n_modules")}
                        />
                        <TextField
                            label="Embedding Size"
                            type="number"
                            onChange={(e) => handleInceptionParamsChange(Number(e.target.value), "embedding_size")}
                        />

                    </FormControl>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={snackbarMessage}
                        color={severity}/>

                </Stack>
            ),
            complete: () => {
                return true;
            }


        }


    ];
    React.useEffect(() => {
        api.getDatasetsDatasetGet().then((response) => {
            setDatasets(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    let handleInceptionParamsChange = (value: any, key: string) => {
        setInceptionParams((prev) => ({...prev, [key]: value}));
    }

    let handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        let realTrainParameters = trainParameters as TrainParameters;
        realTrainParameters.parameters = inceptionParams as InceptionParams;
        realTrainParameters.dataset_id = selectedDataset.id;
        realTrainParameters.architecture = "INCEPTION";
        realTrainParameters.name="INCEPTION";
        console.log(realTrainParameters);
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
        <Box sx={{
            marginTop:"10vh",
            maxWidth: 400
        }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) =>
                    (<Step key={step.label}>
                        <StepLabel>
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {step.content}
                            <Box sx={{mb: 2}}>
                                <div>
                                    <Button
                                        disabled={!step.complete()}
                                        onClick={index === steps.length - 1 ? (e) => handleSubmit(e) : handleNext}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        {index === steps.length - 1 ? 'Train!' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>))}
            </Stepper>
        </Box>
    )
        ;

}
