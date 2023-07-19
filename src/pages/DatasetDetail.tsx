import {groupBy} from "../utils/array";
import React, {useCallback, useEffect} from "react";
import {BaselineProcessModelDetailedView, BaselineProcessModelListView, DatasetDetailedView} from "../api";
import {useAPIClient} from "../api/bridge";
import {Box, Stack} from "@mui/joy";
import Typography from '@mui/joy/Typography';
import {mapSnakeToHumanReadable} from "../utils/text";
import {HumanReadableDataTable, RawDataTable} from "../components/Table";
import {useParams} from "react-router-dom";
import {getBaselineDetail, getBaselines} from "../utils/baselines";
import {BaselineProcessModelDisplay} from "../components/PetriNetView";


export const DatasetDetailPage: React.FunctionComponent<any> = () => {
    let {id} = useParams();
    const [datasetId,] = React.useState<string>(id as string);
    const [dataset, setDataset] = React.useState<DatasetDetailedView>({} as DatasetDetailedView);
    const [valueSplits, setValueSplits] = React.useState<{ [key: string]: any[] }>({});
    const [baselines, setBaselines] = React.useState<{[key: string]: BaselineProcessModelDetailedView}>({} as {[key: string]: BaselineProcessModelDetailedView});
    const [metrics, setMetrics] = React.useState<{[key: string]: any}>({} as {[key: string]: any});
    const [metricsList, setMetricsList] = React.useState<string[]>([] as string[]);
    const api = useAPIClient();
    useEffect(() => {
        api.getDatasetDatasetDatasetIdGet(datasetId).then((response) => {
                setDataset(response.data as DatasetDetailedView);
                setValueSplits(groupBy(response.data.metrics.values, "type"));
                mapSnakeToHumanReadable(Object.keys(valueSplits));
            api.getBaselineProcessesDatasetDatasetIdBaselinesGet(id).then((response) => {
                // eslint-disable-next-line array-callback-return
                response.data.map((baseline: BaselineProcessModelListView) => {
                    // eslint-disable-next-line array-callback-return
                    api.getBaselineProcessModelBaselineProcessIdGet(baseline.id).then((response) => {
                        let bb = response.data as BaselineProcessModelDetailedView;
                        setBaselines(b =>{
                            let newBaselines = b;
                            newBaselines[bb.algorithm + ""] = bb;
                            return newBaselines;

                        });
                        setMetrics(m => {
                            let newMetrics = metrics;
                            newMetrics[baseline.algorithm + ""] = {...{name: baseline.algorithm}, ...bb.metrics};
                            return newMetrics;

                        })
                    })
                })
                setMetrics(Object.keys(metrics))
            })


            });
    }, [metricsList]);
    return (
        <Box>
            <Stack spacing={4}>
                <Typography level='h1'>{dataset.name}</Typography>
                <Typography>{dataset.description}</Typography>
                {Object.keys(valueSplits).map((split) =>
                    <>
                        <h4>{mapSnakeToHumanReadable(Object.keys(valueSplits))[split]} Values</h4>
                        <RawDataTable data={valueSplits[split]} ignore={["type"]}/>
                    </>
                )
                }
                <h4>Baselines</h4>
                <Stack spacing={3}>
                    {Object.values(baselines).map((baseline) => <BaselineProcessModelDisplay id={baseline.id}
                                                                                             algorithm={baseline.algorithm + ""}/>)}
                    <HumanReadableDataTable data={Object.values(metrics)} ignore={["id"]}/>

                </Stack>


            </Stack>
        </Box>);
}
