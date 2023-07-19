import React from 'react';
import {DatasetListView} from "../api/api";
import {useAPIClient} from "../api/bridge";
import {Button, List, ListItem, Stack, Modal} from "@mui/joy";
import {DatasetUploadForm} from "../components/DatasetUploadForm";
import {useNavigate} from "react-router-dom";

export const DatasetListPage = () => {
    let api = useAPIClient();
    let navigate = useNavigate();
    const [datasets, setDatasets] = React.useState<DatasetListView[]>([]);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    React.useEffect(() => {
        api.getDatasetsDatasetGet().then((response) => {
            setDatasets(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [api]);
    return (
        <>
            <Stack>
                <h1>Dataset List</h1>
                <List>
                    {datasets.map((dataset) => (
                        <ListItem onClick={() => navigate("/datasets/" + dataset.id)}
                                  key={dataset.id}>{dataset.name}</ListItem>
                    ))}
                </List>
                <Stack>
                    <Button onClick={() => setModalOpen(true)} sx={{mt: 1, mr: 1}}>Add Dataset</Button>
                </Stack>
            </Stack>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <DatasetUploadForm/>
            </Modal>
        </>

    );
}