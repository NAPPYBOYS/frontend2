import {TrainedModelDetailedView, DatasetDetailedView, InceptionParams,LearnedProcessModelView,BaselineProcessModelDetailedView} from "../api";
import React from "react";
import {useAPIClient} from "../api/bridge";
import {useParams} from "react-router-dom";


type ModelSummary = {
    name: string;
    dataset: string;
    accuracy: number;
    architecture: string;
}
export const ModelDetailPage: React.FunctionComponent = () => {
    let {id} = useParams();
    const [model, setModel] = React.useState<TrainedModelDetailedView>({} as TrainedModelDetailedView);
    const [dataset, setDataset] = React.useState<DatasetDetailedView>({} as DatasetDetailedView);
    const [params, setParams] = React.useState<InceptionParams>({} as InceptionParams);
    const [learnedProcessModel, setLearnedProcessModel] = React.useState<LearnedProcessModelView>({} as LearnedProcessModelView);
    const [baselines, setBaselines] = React.useState<ModelSummary[]>([] as ModelSummary[]);
    const api = useAPIClient();
    React.useEffect(() => {
        api.getTrainedModelModelModelIdGet(id).then((response) => {
            setModel(response.data as TrainedModelDetailedView);
            setParams(response.data.parameters as InceptionParams);
            api.getDatasetDatasetDatasetIdGet(model.dataset.id).then((dataset) => {
                setDataset(dataset.data as DatasetDetailedView);
            })
        });
        api.getLearnedProcessModelModelModelIdProcessGet(id).then((response) => {
            setLearnedProcessModel(response.data as LearnedProcessModelView);
        });
    }, [api,id, model.dataset.id]);
    return (
        <div>
            <h1>Model Detail</h1>
            <ul>
                <li>{dataset?.name}</li>
                <li>{model?.parameters.parameters}</li>
                <li>{params?.input_length}</li>
                <li>{params?.n_modules}</li>
            </ul>
        </div>
    );
}
//TODO: Finish Trained Model Visualization
