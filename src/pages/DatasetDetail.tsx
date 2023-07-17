import {groupBy} from "../utils/array";
import React, {useEffect} from "react";
import {DatasetDetailedView} from "../api";
import {useAPIClient} from "../api/bridge";
import {Box, Stack} from "@mui/joy";
import Typography from '@mui/joy/Typography';
import {mapSnakeToHumanReadable} from "../utils/text";
import {RawDataTable} from "../components/Table";
import {useParams} from "react-router-dom";


export const DatasetDetailPage: React.FunctionComponent<any> = () => {
    let {id} = useParams();
    const [datasetId,] = React.useState<string>(id as string);
    const [dataset, setDataset] = React.useState<DatasetDetailedView>({} as DatasetDetailedView);
    const [valueSplits, setValueSplits] = React.useState<{ [key: string]: any[] }>({});
    const [splitLabels, setSplitLabels] = React.useState<{ [key: string]: string }>({});

    const api = useAPIClient();
    useEffect(() => {
        api.getDatasetDatasetDatasetIdGet(datasetId).then((response) => {
                setDataset(response.data as DatasetDetailedView);
                setValueSplits(groupBy(response.data.metrics.values, "type"));
            mapSnakeToHumanReadable(Object.keys(valueSplits))           }
        );
    }, []);
    return (
        <Box>
            <Stack>
                <Typography>{dataset.name}</Typography>
                <Typography level='h1'>{dataset.description}</Typography>
                {Object.keys(valueSplits).map((split) =>
                    <>
                        <h4>{mapSnakeToHumanReadable(Object.keys(valueSplits))[split]}</h4>
                        <RawDataTable data={valueSplits[split]}/>
                    </>
                )
                }
            </Stack>
        </Box>);
}
