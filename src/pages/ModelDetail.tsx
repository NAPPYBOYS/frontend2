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
import {getBaselines, getBaselineDetail} from "../utils/baselines";
import {LearnedProcessModelDisplay, BaselineProcessModelDisplay} from "../components/PetriNetView";
import {Stack} from "@mui/joy";
import {HumanReadableDataTable} from "../components/Table";


type ModelSummary = {
    name: string;
    dataset: string;
    architecture: string;
}
export const ModelDetailPage: React.FunctionComponent = () => {
    let {id} = useParams();
    const [model, setModel] = React.useState<TrainedModelDetailedView>({} as TrainedModelDetailedView);
    const [dataset, setDataset] = React.useState<DatasetDetailedView>({} as DatasetDetailedView);
    const [params, setParams] = React.useState<InceptionParams>({} as InceptionParams);
    const [learnedProcessModel, setLearnedProcessModel] = React.useState<LearnedProcessModelView>({} as LearnedProcessModelView);
    const [baselines, setBaselines] = React.useState<BaselineProcessModelDetailedView[]>([] as BaselineProcessModelDetailedView[]);
    const [metrics, setMetrics] = React.useState<any[]>([] as any[]);
    const api = useAPIClient();
    React.useEffect(() => {
        api.getTrainedModelModelModelIdGet(id).then((response) => {
            setModel(response.data as TrainedModelDetailedView);
            setParams(response.data.parameters as InceptionParams);
            api.getDatasetDatasetDatasetIdGet(model.dataset.id).then((dataset) => {
                setDataset(dataset.data as DatasetDetailedView);
            })
        });
        getBaselines(dataset.id, (baselineList: BaselineProcessModelListView[]) => {
            // eslint-disable-next-line array-callback-return
            baselineList.map((baseline) => {
                getBaselineDetail(baseline.id, (baseline: BaselineProcessModelDetailedView) => {
                    setBaselines(baselines => [...baselines, baseline]);
                    setMetrics(metrics => [...metrics, {...{algorithm:baseline.algorithm+""},...baseline.metrics}])
                })
            })
        })
        api.getLearnedProcessModelModelModelIdProcessGet(id).then((response) => {
            setLearnedProcessModel(response.data as LearnedProcessModelView);
            setMetrics(metrics => [...metrics, {...{algorithm:"Ours"},...response.data.metrics}])
        });
    }, [api, id, model.dataset.id]);
    return (
        <Stack>
            <ul>
                <li>{dataset?.name}</li>
                <li>{model?.parameters.parameters}</li>
                <li>{params?.input_length}</li>
                <li>{params?.n_modules}</li>
            </ul>
            <Stack>
                {baselines.map((baseline) => <BaselineProcessModelDisplay id={baseline.id}
                                                                          algorithm={baseline.algorithm+""}/>)}
                <LearnedProcessModelDisplay id={learnedProcessModel.id}/>
            </Stack>
            <HumanReadableDataTable data={metrics}/>

        </Stack>
    );
}
//TODO: Finish Trained Model Visualization
