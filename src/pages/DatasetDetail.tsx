import {groupBy} from "../utils/array";
import React, {useEffect} from "react";
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
    const [baselines, setBaselines] = React.useState<BaselineProcessModelDetailedView[]>([] as BaselineProcessModelDetailedView[]);
    const [metrics, setMetrics] = React.useState<any[]>([] as any[]);

    const api = useAPIClient();
    useEffect(() => {
        api.getDatasetDatasetDatasetIdGet(datasetId).then((response) => {
                setDataset(response.data as DatasetDetailedView);
                setValueSplits(groupBy(response.data.metrics.values, "type"));
                mapSnakeToHumanReadable(Object.keys(valueSplits))
                getBaselines(response.data.id, (baselineList: BaselineProcessModelListView[]) => {
                    // eslint-disable-next-line array-callback-return
                    baselineList.map((baseline) => {
                        getBaselineDetail(baseline.id, (baseline: BaselineProcessModelDetailedView) => {
                            setBaselines(baselines => [...baselines, baseline]);
                            setMetrics(metrics => [...metrics, {...{algorithm: baseline.algorithm + ""}, ...baseline.metrics}])
                        })
                    })
                })

            }
        );
    }, []);
    return (
        <Box>
            <Stack>
                <Typography level='h1'>{dataset.name}</Typography>
                <Typography>{dataset.description}</Typography>
                {Object.keys(valueSplits).map((split) =>
                    <>
                        <h4>{mapSnakeToHumanReadable(Object.keys(valueSplits))[split]}</h4>
                        <RawDataTable data={valueSplits[split]} ignore={["type"]}/>
                    </>
                )
                }
                <Typography>Baselines</Typography>
                {baselines.map((baseline) => <BaselineProcessModelDisplay id={baseline.id}
                                                                          algorithm={baseline.algorithm + ""}/>)}
                <HumanReadableDataTable data={metrics.slice(0, metrics.length / 2 - 1)}/>


            </Stack>
        </Box>);
}
