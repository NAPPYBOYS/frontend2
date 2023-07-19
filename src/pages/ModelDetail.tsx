import {
    TrainedModelDetailedView,
    DatasetDetailedView,
    InceptionParams,
    LearnedProcessModelView,
    BaselineProcessModelDetailedView, BaselineProcessModelListView
} from "../api";
import React from "react";
import {useAPIClient} from "../api/bridge";
import {useParams} from "react-router-dom";
import {LearnedProcessModelDisplay, BaselineProcessModelDisplay} from "../components/PetriNetView";
import {Stack} from "@mui/joy";
import {HumanReadableDataTable} from "../components/Table";


type ModelSummary = {
    name: string;
    dataset: string;
    architecture: string;
}
export const ModelDetailPage: React.FunctionComponent = () => {
    console.log(useParams())
    let {id} = useParams();
    const [model, setModel] = React.useState<TrainedModelDetailedView>({} as TrainedModelDetailedView);
    const [dataset, setDataset] = React.useState<DatasetDetailedView>({} as DatasetDetailedView);
    const [params, setParams] = React.useState<InceptionParams>({} as InceptionParams);
    const [learnedProcessModel, setLearnedProcessModel] = React.useState<LearnedProcessModelView>({} as LearnedProcessModelView);
    const [baselines, setBaselines] = React.useState<{[key: string]: BaselineProcessModelDetailedView}>({} as {[key: string]: BaselineProcessModelDetailedView});
    const [metrics, setMetrics] = React.useState<{ [key: string]: any }>({} as { [key: string]: any });
    const api = useAPIClient();
    React.useEffect(() => {
        api.getTrainedModelModelModelIdGet(id).then((response) => {
            setModel(response.data as TrainedModelDetailedView);
            setParams(response.data.parameters as InceptionParams);
            api.getDatasetDatasetDatasetIdGet(response.data.dataset.id).then((dataset) => {
                setDataset(dataset.data as DatasetDetailedView);
            })
            api.getBaselineProcessesDatasetDatasetIdBaselinesGet(response.data.dataset.id).then((response) => {
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
            })
            });
            api.getLearnedProcessModelModelModelIdProcessGet(id).then((response) => {
                setLearnedProcessModel(response.data as LearnedProcessModelView);
                setMetrics(metrics => {
                    let newMetrics = metrics;
                    newMetrics["Learned Process Model"] = {...{name: "Learned Process Model"}, ...response.data.metrics};
                    return newMetrics;
                })
            });
        }, [model.id,dataset.id]);
        return (
            <Stack>
                <ul>
                    <li>{dataset?.name}</li>
                    <li>{params?.input_length}</li>
                    <li>{params?.n_modules}</li>
                </ul>
                <Stack>
                    {Object.values(baselines).map((baseline) => <BaselineProcessModelDisplay id={baseline.id}
                                                                              algorithm={baseline.algorithm + ""}/>)}
                    <LearnedProcessModelDisplay id={model.id}/>
                </Stack>
                <HumanReadableDataTable data={Object.values(metrics)} ignore={["id"]}/>

            </Stack>
        );
    }
//TODO: Finish Trained Model Visualization
