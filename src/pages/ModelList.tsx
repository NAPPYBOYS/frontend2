import {TrainedModelListView,DatasetDetailedView} from '../api'
import React from 'react';
import {useAPIClient} from "../api/bridge";
import {List, ListItem, Stack, Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";

export const ModelListPage = () => {
    let api = useAPIClient();
    let navigate = useNavigate()
    const [models, setModels] = React.useState<TrainedModelListView[]>([]);
    const [dataset, setDataset] = React.useState<{[key: string] : DatasetDetailedView}>({});
    React.useEffect(() => {
        api.getTrainedModelsModelGet().then((response) => {
            setModels(response.data)
            for (let model of response.data) {
                api.getDatasetDatasetDatasetIdGet(model.dataset.id).then((dataset) => {
                    setDataset((prev) => ({...prev, [model.id]: dataset.data}))
                })
            }
        });
    }, []);
    return (
        <Stack>
            <Typography level ="h1">Model List</Typography>
            <List>
                {models.map((model) => (
                    <ListItem key={model.id}  onClick ={()=> {navigate("/models/"+model.id)}} >
                        <Stack>
                            <Typography level="h6">{model.id}</Typography>
                            <Typography>{dataset[model.id]?.name}</Typography>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}